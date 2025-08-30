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

// Simple fetch-based Supabase client for server-side operations
export const supabaseServer = isSupabaseConfigured ? {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}`, {
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json()
            return { data: data[0] || null, error: null }
          } catch (error) {
            return { data: null, error }
          }
        },
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
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
        })
      }),
      gte: (column: string, value: any) => ({
        lt: (column2: string, value2: any) => ({
          order: (column: string, options: { ascending: boolean }) => ({
            limit: (limit: number) => ({
              async then(resolve: any) {
                try {
                  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}>=${encodeURIComponent(value)}&${column2}<${encodeURIComponent(value2)}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
          })
        }),
        order: (column: string, options: { ascending: boolean }) => ({
          limit: (limit: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}>=${encodeURIComponent(value)}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
        })
      }),
      limit: (limit: number) => ({
        async then(resolve: any) {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&limit=${limit}`, {
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
      }),
      or: (condition: string) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${condition}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
                  headers: {
                    'apikey': supabaseAnonKey!,
                    'Authorization': `Bearer ${supabaseAnonKey}`,
                    'Content-Type': 'application/json'
                  }
                })
                const data = await response.json()
                resolve({ data, error: null, count: data.length })
              } catch (error) {
                resolve({ data: null, error, count: 0 })
              }
            }
          })
        })
      }),
      in: (column: string, values: any[]) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const valuesStr = values.map(v => encodeURIComponent(v)).join(',')
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}=in.(${valuesStr})&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
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
        })
      }),
      // Add the missing methods that are expected by the query builder
      eq: (column: string, value: any) => ({
        single: async () => {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}`, {
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json()
            return { data: data[0] || null, error: null }
          } catch (error) {
            return { data: null, error }
          }
        },
        order: (column: string, options: { ascending: boolean }) => ({
          limit: (limit: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
        })
      }),
      gte: (column: string, value: any) => ({
        lt: (column2: string, value2: any) => ({
          order: (column: string, options: { ascending: boolean }) => ({
            limit: (limit: number) => ({
              async then(resolve: any) {
                try {
                  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}>=${encodeURIComponent(value)}&${column2}<${encodeURIComponent(value2)}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
          })
        }),
        order: (column: string, options: { ascending: boolean }) => ({
          limit: (limit: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}>=${encodeURIComponent(value)}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
        })
      }),
      limit: (limit: number) => ({
        async then(resolve: any) {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&limit=${limit}`, {
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
      }),
      or: (condition: string) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${condition}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
                  headers: {
                    'apikey': supabaseAnonKey!,
                    'Authorization': `Bearer ${supabaseAnonKey}`,
                    'Content-Type': 'application/json'
                  }
                })
                const data = await response.json()
                resolve({ data, error: null, count: data.length })
              } catch (error) {
                resolve({ data: null, error, count: 0 })
              }
            }
          })
        })
      }),
      in: (column: string, values: any[]) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const valuesStr = values.map(v => encodeURIComponent(v)).join(',')
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}=in.(${valuesStr})&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
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
        })
      })
    }),
        single: async () => {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}`, {
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json()
            return { data: data[0] || null, error: null }
          } catch (error) {
            return { data: null, error }
          }
        },
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}&select=${columns}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
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
        })
      }),
      gte: (column: string, value: any) => ({
        lt: (column2: string, value2: any) => ({
          order: (column: string, options: { ascending: boolean }) => ({
            limit: (limit: number) => ({
              async then(resolve: any) {
                try {
                  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}>=${encodeURIComponent(value)}&${column2}<${encodeURIComponent(value2)}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
          })
        }),
        order: (column: string, options: { ascending: boolean }) => ({
          limit: (limit: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}>=${encodeURIComponent(value)}&order=${column}.${options.ascending ? 'asc' : 'desc'}&limit=${limit}`, {
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
        })
      }),
      limit: (limit: number) => ({
        async then(resolve: any) {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&limit=${limit}`, {
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
      }),
      or: (condition: string) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${condition}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
                  headers: {
                    'apikey': supabaseAnonKey!,
                    'Authorization': `Bearer ${supabaseAnonKey}`,
                    'Content-Type': 'application/json'
                  }
                })
                const data = await response.json()
                resolve({ data, error: null, count: data.length })
              } catch (error) {
                resolve({ data: null, error, count: 0 })
              }
            }
          })
        })
      }),
      in: (column: string, values: any[]) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              try {
                const valuesStr = values.map(v => encodeURIComponent(v)).join(',')
                const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${column}=in.(${valuesStr})&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
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
        })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
              method: 'POST',
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            const result = await response.json()
            return { data: result, error: null }
          } catch (error) {
            return { data: null, error }
          }
        }
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        async then(resolve: any) {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}`, {
              method: 'PATCH',
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            const result = await response.json()
            resolve({ data: result, error: null })
          } catch (error) {
            resolve({ data: null, error })
          }
        }
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        async then(resolve: any) {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}`, {
              method: 'DELETE',
              headers: {
                'apikey': supabaseAnonKey!,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
              }
            })
            const result = await response.json()
            resolve({ data: result, error: null })
          } catch (error) {
            resolve({ data: null, error })
          }
        }
      })
    }),
    rpc: (functionName: string, params: any) => ({
      async then(resolve: any) {
        try {
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
            method: 'POST',
            headers: {
              'apikey': supabaseAnonKey!,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          })
          const result = await response.json()
          resolve({ data: result, error: null })
        } catch (error) {
          resolve({ data: null, error })
        }
      }
    })
  })
} : null

// Create service role client for server-side operations (if needed)
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceRoleKey ? {
  from: (table: string) => ({
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        async then(resolve: any) {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${encodeURIComponent(value)}`, {
              method: 'PATCH',
              headers: {
                'apikey': supabaseServiceRoleKey!,
                'Authorization': `Bearer ${supabaseServiceRoleKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            const result = await response.json()
            resolve({ data: result, error: null })
          } catch (error) {
            resolve({ data: null, error })
          }
        }
      })
    })
  })
} : null