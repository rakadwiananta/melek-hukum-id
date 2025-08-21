# API Integration Examples
Panduan penggunaan API yang terhubung dengan Views dan Functions SQL

## 📊 Analytics APIs

### 1. Article Statistics API
**Endpoint:** `/api/analytics/article-stats`

#### Mendapatkan statistik artikel spesifik:
```javascript
// Frontend usage example
const getArticleStats = async (articleId) => {
  const response = await fetch(`/api/analytics/article-stats?id=${articleId}`)
  const data = await response.json()
  
  if (data.success) {
    return {
      likes: data.data.total_likes,
      comments: data.data.total_comments,
      bookmarks: data.data.total_bookmarks,
      engagementRate: data.data.engagement_rate,
      popularityScore: data.data.popularity_score
    }
  }
}

// Usage in React component
const ArticleStatsWidget = ({ articleId }) => {
  const [stats, setStats] = useState(null)
  
  useEffect(() => {
    getArticleStats(articleId).then(setStats)
  }, [articleId])
  
  if (!stats) return <div>Loading...</div>
  
  return (
    <div className="stats-widget">
      <div>👍 {stats.likes} Likes</div>
      <div>💬 {stats.comments} Comments</div>
      <div>🔖 {stats.bookmarks} Bookmarks</div>
      <div>📈 {stats.engagementRate}% Engagement</div>
    </div>
  )
}
```

#### Mendapatkan top articles per kategori:
```javascript
const getTopArticlesByCategory = async (category = null, limit = 10) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: 'popularity_score'
  })
  
  if (category) params.append('category', category)
  
  const response = await fetch(`/api/analytics/article-stats?${params}`)
  const data = await response.json()
  
  return data.data
}
```

### 2. Trending Articles API
**Endpoint:** `/api/analytics/trending`

```javascript
// Mendapatkan artikel trending
const getTrendingArticles = async (days = 7, category = null) => {
  const params = new URLSearchParams({
    days: days.toString(),
    limit: '10'
  })
  
  if (category) params.append('category', category)
  
  const response = await fetch(`/api/analytics/trending?${params}`)
  const data = await response.json()
  
  return data.data.map(article => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    trendScore: article.trend_score,
    recentActivity: {
      likes: article.recent_likes,
      comments: article.recent_comments,
      bookmarks: article.recent_bookmarks
    }
  }))
}

// React component untuk trending articles
const TrendingArticles = () => {
  const [trending, setTrending] = useState([])
  const [period, setPeriod] = useState(7)
  
  useEffect(() => {
    getTrendingArticles(period).then(setTrending)
  }, [period])
  
  return (
    <div className="trending-section">
      <h3>🔥 Artikel Trending</h3>
      <select 
        value={period} 
        onChange={(e) => setPeriod(Number(e.target.value))}
      >
        <option value={1}>24 Jam</option>
        <option value={7}>7 Hari</option>
        <option value={30}>30 Hari</option>
      </select>
      
      {trending.map(article => (
        <div key={article.id} className="trending-item">
          <h4>{article.title}</h4>
          <div className="trend-metrics">
            <span>Score: {article.trendScore}</span>
            <span>👍 {article.recentActivity.likes}</span>
            <span>💬 {article.recentActivity.comments}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 3. User Activity API
**Endpoint:** `/api/analytics/user-activity`

```javascript
// Mendapatkan aktivitas user saat ini
const getCurrentUserActivity = async (includeDetails = false) => {
  const params = new URLSearchParams()
  if (includeDetails) params.append('details', 'true')
  
  const response = await fetch(`/api/analytics/user-activity?${params}`)
  const data = await response.json()
  
  return data.data
}

// User Profile Component
const UserProfile = () => {
  const [userActivity, setUserActivity] = useState(null)
  
  useEffect(() => {
    getCurrentUserActivity(true).then(setUserActivity)
  }, [])
  
  if (!userActivity) return <div>Loading...</div>
  
  return (
    <div className="user-profile">
      <h3>Aktivitas Anda</h3>
      <div className="activity-stats">
        <div>👍 {userActivity.total_likes} Likes</div>
        <div>💬 {userActivity.total_comments} Comments</div>
        <div>🔖 {userActivity.total_bookmarks} Bookmarks</div>
        <div>Level: {userActivity.engagement_level}</div>
      </div>
      
      {userActivity.recent_activities && (
        <div className="recent-activities">
          <h4>Artikel yang Disukai</h4>
          {userActivity.recent_activities.liked_articles.map(like => (
            <div key={like.article_id}>
              <a href={`/artikel/${like.articles.slug}`}>
                {like.articles.title}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

### 4. Dashboard API
**Endpoint:** `/api/analytics/dashboard`

```javascript
// Admin Dashboard Data
const getDashboardData = async (period = 7, category = null) => {
  const params = new URLSearchParams({ period: period.toString() })
  if (category) params.append('category', category)
  
  const response = await fetch(`/api/analytics/dashboard?${params}`)
  const data = await response.json()
  
  return data.data
}

// Dashboard Component
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [period, setPeriod] = useState(7)
  
  useEffect(() => {
    getDashboardData(period).then(setDashboardData)
  }, [period])
  
  if (!dashboardData) return <div>Loading dashboard...</div>
  
  const { overview, daily_activity, top_articles, category_performance } = dashboardData
  
  return (
    <div className="admin-dashboard">
      <h2>📊 Dashboard Analytics</h2>
      
      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="card">
          <h3>Total Views</h3>
          <p>{overview.total_views.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Likes</h3>
          <p>{overview.total_likes.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Comments</h3>
          <p>{overview.total_comments.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Engagement Rate</h3>
          <p>{overview.avg_engagement_rate.toFixed(2)}%</p>
        </div>
      </div>
      
      {/* Daily Activity Chart */}
      <div className="daily-activity">
        <h3>Aktivitas Harian</h3>
        {daily_activity.map(day => (
          <div key={day.activity_date} className="day-stats">
            <span>{day.activity_date}</span>
            <span>👍 {day.total_likes}</span>
            <span>💬 {day.total_comments}</span>
            <span>🔖 {day.total_bookmarks}</span>
          </div>
        ))}
      </div>
      
      {/* Top Articles */}
      <div className="top-articles">
        <h3>Artikel Terpopuler</h3>
        {top_articles.map((article, index) => (
          <div key={article.id} className="top-article">
            <span>#{index + 1}</span>
            <div>
              <h4>{article.title}</h4>
              <p>Score: {article.popularity_score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 🛠️ Comment Moderation API
**Endpoint:** `/api/admin/comment-moderation`

```javascript
// Mendapatkan queue moderasi
const getModerationQueue = async (status = 'pending', limit = 20) => {
  const params = new URLSearchParams({ status, limit: limit.toString() })
  const response = await fetch(`/api/admin/comment-moderation?${params}`)
  const data = await response.json()
  
  return data.data
}

// Moderasi komentar
const moderateComment = async (commentId, action, reason = '') => {
  const response = await fetch('/api/admin/comment-moderation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commentId, action, reason })
  })
  
  return await response.json()
}

// Moderation Interface
const CommentModerationPanel = () => {
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    loadModerationQueue()
  }, [])
  
  const loadModerationQueue = async () => {
    setLoading(true)
    const data = await getModerationQueue('pending', 50)
    setQueue(data)
    setLoading(false)
  }
  
  const handleModeration = async (commentId, action) => {
    const result = await moderateComment(commentId, action)
    if (result.success) {
      // Remove from queue
      setQueue(prev => prev.filter(comment => comment.id !== commentId))
      toast.success(`Comment ${action}ed successfully`)
    }
  }
  
  return (
    <div className="moderation-panel">
      <h3>🛡️ Comment Moderation Queue</h3>
      
      {loading ? <div>Loading...</div> : (
        <div className="comment-queue">
          {queue.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong>{comment.author_name}</strong>
                <span className="priority">Priority: {comment.moderation_priority}</span>
                <span className="spam-indicator">{comment.spam_indicator}</span>
              </div>
              
              <div className="comment-content">
                {comment.content}
              </div>
              
              <div className="comment-meta">
                <span>Article: {comment.article_title}</span>
                <span>Posted: {new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              
              <div className="moderation-actions">
                <button 
                  onClick={() => handleModeration(comment.id, 'approve')}
                  className="btn-approve"
                >
                  ✅ Approve
                </button>
                <button 
                  onClick={() => handleModeration(comment.id, 'reject')}
                  className="btn-reject"
                >
                  ❌ Reject
                </button>
                <button 
                  onClick={() => handleModeration(comment.id, 'spam')}
                  className="btn-spam"
                >
                  🚫 Spam
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## 📈 Real-time Updates dengan Server-Sent Events (Optional)

```javascript
// Real-time dashboard updates
const useRealTimeDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  
  useEffect(() => {
    // Initial load
    getDashboardData().then(setDashboardData)
    
    // Setup polling untuk real-time updates
    const interval = setInterval(() => {
      getDashboardData().then(setDashboardData)
    }, 30000) // Update setiap 30 detik
    
    return () => clearInterval(interval)
  }, [])
  
  return dashboardData
}
```

## 🔧 Utility Functions untuk Frontend

```javascript
// Format numbers untuk display
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Calculate engagement rate
const calculateEngagementRate = (views, likes, comments) => {
  if (views === 0) return 0
  return ((likes + comments) / views * 100).toFixed(2)
}

// Get engagement level color
const getEngagementLevelColor = (level) => {
  const colors = {
    'Very Active': '#10B981', // green
    'Active': '#3B82F6',      // blue
    'Moderate': '#F59E0B',    // yellow
    'Low': '#6B7280'          // gray
  }
  return colors[level] || colors['Low']
}
```

## 📱 Mobile-Responsive Components

```javascript
// Mobile-friendly stats display
const MobileStatsCard = ({ title, value, icon, trend }) => (
  <div className="mobile-stats-card">
    <div className="stats-icon">{icon}</div>
    <div className="stats-content">
      <h4>{title}</h4>
      <p className="stats-value">{formatNumber(value)}</p>
      {trend && (
        <span className={`trend ${trend > 0 ? 'positive' : 'negative'}`}>
          {trend > 0 ? '📈' : '📉'} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
)
```

Semua API ini terhubung langsung dengan views dan functions SQL yang telah dibuat, memberikan performa optimal dan data real-time untuk sistem like, comment, dan save pada artikel Anda.