// Server-side Supabase client using fetch (no Supabase library import)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

if (!isSupabaseConfigured && process.env.NODE_ENV !== 'production') {
  console.warn('Supabase environment variables are not set. Please check your .env.local file.')
  console.warn('Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Helper function to create query builder with common methods
const createQueryBuilder = (table: string, columns: string, baseUrl: string) => {
  const baseQuery = `${baseUrl}/rest/v1/${table}?select=${columns}`
  
  const addFilter = (url: string, filter: string) => {
    return url.includes('?') ? `${url}&${filter}` : `${url}?${filter}`
  }

  const createThenable = (url: string) => ({
    async then(resolve: any) {
      try {
        const response = await fetch(url, {
          headers: {
            'apikey': supabaseAnonKey!,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        resolve({ data, error: null })
      } catch (error) {
        resolve({ data: null, error })
      }
    }
  })

  const createSingleThenable = (url: string) => ({
    async then(resolve: any) {
      try {
        const response = await fetch(url, {
          headers: {
            'apikey': supabaseAnonKey!,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        resolve({ data: data[0] || null, error: null })
      } catch (error) {
        resolve({ data: null, error })
      }
    }
  })

  const createMethodChain = (currentUrl: string) => {
    const chain = {
      eq: (column: string, value: any) => {
        const newUrl = addFilter(currentUrl, `${column}=eq.${encodeURIComponent(value)}`)
        return createMethodChain(newUrl)
      },
      gte: (column: string, value: any) => {
        const newUrl = addFilter(currentUrl, `${column}>=${encodeURIComponent(value)}`)
        return createMethodChain(newUrl)
      },
      lt: (column: string, value: any) => {
        const newUrl = addFilter(currentUrl, `${column}<${encodeURIComponent(value)}`)
        return createMethodChain(newUrl)
      },
      not: (column: string, operator: string, value: any) => {
        const newUrl = addFilter(currentUrl, `${column}.not.${operator}.${encodeURIComponent(value)}`)
        return createMethodChain(newUrl)
      },
      in: (column: string, values: any[]) => {
        const valuesStr = values.map(v => encodeURIComponent(v)).join(',')
        const newUrl = addFilter(currentUrl, `${column}=in.(${valuesStr})`)
        return createMethodChain(newUrl)
      },
      order: (column: string, options: { ascending: boolean }) => {
        const newUrl = addFilter(currentUrl, `order=${column}.${options.ascending ? 'asc' : 'desc'}`)
        return createMethodChain(newUrl)
      },
      limit: (limit: number) => {
        const newUrl = addFilter(currentUrl, `limit=${limit}`)
        return createMethodChain(newUrl)
      },
      range: (start: number, end: number) => {
        const newUrl = addFilter(currentUrl, `range=${start}-${end}`)
        return createMethodChain(newUrl)
      },
      single: () => {
        return new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
          createSingleThenable(currentUrl).then((result: any) => {
            if (result.error) {
              reject(result.error)
            } else {
              resolve(result)
            }
          })
        })
      }
    }

    const promise = new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
      createThenable(currentUrl).then((result: any) => {
        if (result.error) {
          reject(result.error)
        } else {
          resolve(result)
        }
      })
    })

    return Object.assign(promise, chain)
  }

  return createMethodChain(baseQuery)
}

// Simple fetch-based Supabase client for server-side operations
export const supabaseServer = isSupabaseConfigured ? {
  from: (table: string) => ({
    select: (columns: string = '*', options?: { count?: string; head?: boolean }) => {
      if (options?.count === 'exact' && options?.head) {
        // Return count query that can be chained
        const countChain = (currentUrl: string) => {
          const chain = {
            eq: (column: string, value: any) => {
              const newUrl = currentUrl.includes('?') ? 
                `${currentUrl}&${column}=eq.${encodeURIComponent(value)}` : 
                `${currentUrl}?${column}=eq.${encodeURIComponent(value)}`
              return countChain(newUrl)
            },
            gte: (column: string, value: any) => {
              const newUrl = currentUrl.includes('?') ? 
                `${currentUrl}&${column}>=${encodeURIComponent(value)}` : 
                `${currentUrl}?${column}>=${encodeURIComponent(value)}`
              return countChain(newUrl)
            },
            lt: (column: string, value: any) => {
              const newUrl = currentUrl.includes('?') ? 
                `${currentUrl}&${column}<${encodeURIComponent(value)}` : 
                `${currentUrl}?${column}<${encodeURIComponent(value)}`
              return countChain(newUrl)
            },
            order: (column: string, options: { ascending: boolean }) => {
              const newUrl = currentUrl.includes('?') ? 
                `${currentUrl}&order=${column}.${options.ascending ? 'asc' : 'desc'}` : 
                `${currentUrl}?order=${column}.${options.ascending ? 'asc' : 'desc'}`
              return countChain(newUrl)
            },
            limit: (limit: number) => {
              const newUrl = currentUrl.includes('?') ? 
                `${currentUrl}&limit=${limit}` : 
                `${currentUrl}?limit=${limit}`
              return countChain(newUrl)
            }
          }

          const promise = new Promise<{ count: number; error: null } | { count: null; error: any }>((resolve, reject) => {
            fetch(currentUrl, {
              method: 'HEAD',
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              const count = parseInt(response.headers.get('content-range')?.split('/')[1] || '0')
              resolve({ count, error: null })
            })
            .catch(error => {
              resolve({ count: null, error })
            })
          })

          return Object.assign(promise, chain)
        }
        
        return countChain(`${supabaseUrl}/rest/v1/${table}?select=${columns}`) as any
      }
      return createQueryBuilder(table, columns, supabaseUrl!)
    },
    insert: (data: any) => {
      const insertPromise = new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
        fetch(`${supabaseUrl}/rest/v1/${table}`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey!,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
          resolve({ data: result, error: null })
        })
        .catch(error => {
          resolve({ data: null, error })
        })
      })

      return Object.assign(insertPromise, {
        select: () => ({
          single: () => insertPromise
        })
      })
    },
    update: (data: any) => ({
      eq: (column: string, value: any) => {
        const updateChain = (currentUrl: string) => {
          const chain = {
            select: (columns?: string) => ({
              single: () => {
                const selectUrl = columns ? `${currentUrl}&select=${columns}` : currentUrl
                return new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
                  fetch(selectUrl, {
                    method: 'PATCH',
                    headers: {
                      'apikey': supabaseAnonKey!,
                      'Authorization': `Bearer ${supabaseAnonKey}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  })
                  .then(response => response.json())
                  .then(result => {
                    resolve({ data: result, error: null })
                  })
                  .catch(error => {
                    resolve({ data: null, error })
                  })
                })
              }
            })
          }

          const updatePromise = new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
            fetch(currentUrl, {
              method: 'PATCH',
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
              resolve({ data: result, error: null })
            })
            .catch(error => {
              resolve({ data: null, error })
            })
          })

          return Object.assign(updatePromise, chain)
        }
        
        return updateChain(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}`)
      }
    }),
    delete: () => {
      const deleteChain = (currentUrl: string) => {
        const chain = {
          eq: (column: string, value: any) => {
            const newUrl = currentUrl.includes('?') ? 
              `${currentUrl}&${column}=eq.${encodeURIComponent(value)}` : 
              `${currentUrl}?${column}=eq.${encodeURIComponent(value)}`
            return deleteChain(newUrl)
          }
        }

        const promise = new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
          fetch(currentUrl, {
            method: 'DELETE',
            headers: {
              'apikey': supabaseAnonKey!,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(result => {
            resolve({ data: result, error: null })
          })
          .catch(error => {
            resolve({ data: null, error })
          })
        })

        return Object.assign(promise, chain)
      }
      
      return deleteChain(`${supabaseUrl}/rest/v1/${table}`)
    }
  }),
  rpc: (functionName: string, params: any) => {
    return new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
      fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey!,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then(response => response.json())
      .then(result => {
        resolve({ data: result, error: null })
      })
      .catch(error => {
        resolve({ data: null, error })
      })
    })
  }
} : null

// Create service role client for server-side operations (if needed)
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceRoleKey ? {
  from: (table: string) => ({
    update: (data: any) => ({
      eq: (column: string, value: any) => {
        const updateChain = (currentUrl: string) => {
          const chain = {
            select: (columns?: string) => ({
              single: () => {
                const selectUrl = columns ? `${currentUrl}&select=${columns}` : currentUrl
                return new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
                  fetch(selectUrl, {
                    method: 'PATCH',
                    headers: {
                      'apikey': supabaseServiceRoleKey!,
                      'Authorization': `Bearer ${supabaseServiceRoleKey}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  })
                  .then(response => response.json())
                  .then(result => {
                    resolve({ data: result, error: null })
                  })
                  .catch(error => {
                    resolve({ data: null, error })
                  })
                })
              }
            })
          }

          const updatePromise = new Promise<{ data: any; error: null } | { data: null; error: any }>((resolve, reject) => {
            fetch(currentUrl, {
              method: 'PATCH',
              headers: {
                'apikey': supabaseServiceRoleKey!,
                'Authorization': `Bearer ${supabaseServiceRoleKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
              resolve({ data: result, error: null })
            })
            .catch(error => {
              resolve({ data: null, error })
            })
          })

          return Object.assign(updatePromise, chain)
        }
        
        return updateChain(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}`)
      }
    })
  })
} : null