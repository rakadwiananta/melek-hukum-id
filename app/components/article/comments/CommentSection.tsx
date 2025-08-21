'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, User, Calendar, Heart, Reply, Flag, ThumbsUp, ChevronDown, ChevronUp, Eye, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from '@/app/components/ui/use-toast'
import { cn } from '@/app/lib/utils'

interface Comment {
  id: string
  content: string
  author_name: string
  created_at: string
  likes?: number
}

interface CommentSectionProps {
  articleId: string
  initialCommentCount?: number
  showCommentForm?: boolean
  onToggleCommentForm?: (show: boolean) => void
}

export default function CommentSection({ 
  articleId, 
  initialCommentCount = 0, 
  showCommentForm: externalShowCommentForm = false,
  onToggleCommentForm 
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [commentCount, setCommentCount] = useState(initialCommentCount)
  const [newComment, setNewComment] = useState({
    content: '',
    author_name: '',
    author_email: ''
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [showCommentForm, setShowCommentForm] = useState(externalShowCommentForm)
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  // Load comments
  const loadComments = async (pageNum = 1, append = false) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/articles/${articleId}/comments?page=${pageNum}&limit=10`)
      const data = await response.json()

      if (response.ok) {
        if (append) {
          setComments(prev => [...prev, ...data.comments])
        } else {
          setComments(data.comments)
        }
        setHasMore(data.hasMore)
        setCommentCount(data.total)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error loading comments:', error)
      toast({
        title: 'Gagal memuat komentar',
        description: 'Silakan coba lagi nanti',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.content.trim() || !newComment.author_name.trim()) {
      toast({
        title: 'Data tidak lengkap',
        description: 'Harap isi nama dan komentar',
        variant: 'destructive'
      })
      return
    }

    if (newComment.content.length < 10) {
      toast({
        title: 'Komentar terlalu pendek',
        description: 'Komentar minimal 10 karakter',
        variant: 'destructive'
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Komentar berhasil dikirim!',
          description: 'Komentar Anda akan tampil setelah dimoderasi',
          variant: 'default'
        })
        setNewComment({ content: '', author_name: '', author_email: '' })
        setShowCommentForm(false)
        setCommentCount(data.commentCount)
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      toast({
        title: 'Gagal mengirim komentar',
        description: error.message || 'Silakan coba lagi nanti',
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Load more comments
  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadComments(nextPage, true)
  }

  useEffect(() => {
    loadComments()
  }, [articleId])

  // Sync with external showCommentForm state
  useEffect(() => {
    setShowCommentForm(externalShowCommentForm)
  }, [externalShowCommentForm])

  // Handle form toggle
  const handleToggleCommentForm = (show: boolean) => {
    setShowCommentForm(show)
    if (onToggleCommentForm) {
      onToggleCommentForm(show)
    }
  }

  // Toggle expanded comment
  const toggleExpanded = (commentId: string) => {
    const newExpanded = new Set(expandedComments)
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId)
    } else {
      newExpanded.add(commentId)
    }
    setExpandedComments(newExpanded)
  }

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Baru saja'
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} jam lalu`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} hari lalu`
    
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  // Truncate long comments
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
      {/* Mobile-First Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Komentar
            </h3>
            {commentCount > 0 && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                {commentCount}
              </span>
            )}
          </div>
          
          {/* Sort Options - Mobile Optimized */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="text-xs sm:text-sm px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>
        </div>
        
        {/* Write Comment Button - Mobile Optimized */}
        <button
          onClick={() => handleToggleCommentForm(!showCommentForm)}
          className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm sm:text-base">
            {showCommentForm ? 'Tutup Form' : 'Tulis Komentar'}
          </span>
        </button>
      </div>

      {/* Comment Form - Mobile Optimized */}
      <AnimatePresence>
        {showCommentForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-200">
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">Tulis Komentar Anda</h4>
              
              <form onSubmit={handleSubmitComment} className="space-y-4">
                {/* Mobile-First Layout */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama *
                    </label>
                    <input
                      type="text"
                      value={newComment.author_name}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Nama Anda"
                      required
                      maxLength={50}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (opsional)
                    </label>
                    <input
                      type="email"
                      value={newComment.author_email}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komentar * <span className="text-gray-500">({newComment.content.length}/1000)</span>
                  </label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={4}
                    placeholder="Bagikan pendapat atau pertanyaan Anda tentang artikel ini..."
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                </div>
                
                {/* Mobile-Optimized Actions */}
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Komentar akan dimoderasi sebelum ditampilkan
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleCommentForm(false)}
                      className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:transform-none text-sm"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Kirim Komentar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments List - Mobile Optimized */}
      <div className="space-y-4">
        {loading && comments.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600">Memuat komentar...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-2xl">
            <MessageCircle className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Belum ada komentar</h4>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
              Jadilah yang pertama berkomentar tentang artikel ini
            </p>
            <button
              onClick={() => handleToggleCommentForm(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Tulis Komentar Pertama
            </button>
          </div>
        ) : (
          <>
            {comments.map((comment, index) => {
              const isExpanded = expandedComments.has(comment.id)
              const shouldTruncate = comment.content.length > 200
              const displayContent = shouldTruncate && !isExpanded 
                ? truncateText(comment.content, 200) 
                : comment.content

              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar - Responsive */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                      {comment.author_name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Header - Mobile Optimized */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <h5 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {comment.author_name}
                        </h5>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{formatTimeAgo(comment.created_at)}</span>
                        </div>
                      </div>
                      
                      {/* Content - Mobile Optimized */}
                      <div className="mb-3">
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base break-words">
                          {displayContent}
                        </p>
                        
                        {/* Expand/Collapse for long comments */}
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleExpanded(comment.id)}
                            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium mt-1 flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-3 w-3" />
                                Sembunyikan
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3 w-3" />
                                Selengkapnya
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      
                      {/* Actions - Mobile Optimized */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <button className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{comment.likes || 0}</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          <Reply className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Balas</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-red-600 transition-colors ml-auto">
                          <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Laporkan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Load More Button - Mobile Optimized */}
            {hasMore && (
              <div className="text-center pt-4 sm:pt-6">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent inline-block mr-2" />
                      Memuat...
                    </>
                  ) : (
                    'Muat Komentar Lainnya'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Community Guidelines - Mobile Optimized */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
          📋 Pedoman Berkomentar
        </h4>
        <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Gunakan bahasa yang sopan dan konstruktif</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Hindari spam, promosi, atau konten yang tidak relevan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Hormati pendapat orang lain meskipun berbeda</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Komentar yang melanggar akan dihapus oleh moderator</span>
          </li>
        </ul>
      </div>
    </div>
  )
}