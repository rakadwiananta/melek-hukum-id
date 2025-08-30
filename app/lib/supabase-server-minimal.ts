// Minimal server-side Supabase client without realtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Simple fetch-based Supabase client for server-side operations
export const supabaseServerMinimal = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${value}&select=${columns}`, {
            headers: {
              'apikey': supabaseAnonKey!,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json()
          return { data: data[0], error: null }
        },
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${value}&select=${columns}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
                headers: {
                  'apikey': supabaseAnonKey!,
                  'Authorization': `Bearer ${supabaseAnonKey}`,
                  'Content-Type': 'application/json'
                }
              })
              const data = await response.json()
              resolve({ data, error: null })
            }
          })
        })
      }),
      or: (condition: string) => ({
        order: (column: string, options: { ascending: boolean }) => ({
          range: (start: number, end: number) => ({
            async then(resolve: any) {
              const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}&${condition}&order=${column}.${options.ascending ? 'asc' : 'desc'}&range=${start}-${end}`, {
                headers: {
                  'apikey': supabaseAnonKey!,
                  'Authorization': `Bearer ${supabaseAnonKey}`,
                  'Content-Type': 'application/json'
                }
              })
              const data = await response.json()
              resolve({ data, error: null, count: data.length })
            }
          })
        })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => {
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
        }
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        async then(resolve: any) {
          const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${column}=eq.${value}`, {
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
        }
      })
    })
  })
}

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)