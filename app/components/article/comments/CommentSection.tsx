'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, User, Calendar, Heart, Reply, Flag, ThumbsUp } from 'lucide-react'
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
}

export default function CommentSection({ articleId, initialCommentCount = 0 }: CommentSectionProps) {
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
  const [showCommentForm, setShowCommentForm] = useState(false)

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

  return (
    <div className="mt-16 pt-8 border-t-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <MessageCircle className="h-7 w-7 text-blue-600" />
          Diskusi & Komentar
          {commentCount > 0 && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {commentCount}
            </span>
          )}
        </h3>
        
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          Tulis Komentar
        </button>
      </div>

      {/* Comment Form */}
      <AnimatePresence>
        {showCommentForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Tulis Komentar Anda</h4>
              
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama *
                    </label>
                    <input
                      type="text"
                      value={newComment.author_name}
                      onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komentar * ({newComment.content.length}/1000)
                  </label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={4}
                    placeholder="Bagikan pendapat atau pertanyaan Anda tentang artikel ini..."
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Komentar akan dimoderasi sebelum ditampilkan
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCommentForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:transform-none"
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

      {/* Comments List */}
      <div className="space-y-6">
        {loading && comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4" />
            <p className="text-gray-600">Memuat komentar...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Belum ada komentar</h4>
            <p className="text-gray-600 mb-6">
              Jadilah yang pertama berkomentar tentang artikel ini
            </p>
            <button
              onClick={() => setShowCommentForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Tulis Komentar Pertama
            </button>
          </div>
        ) : (
          <>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-gray-900">{comment.author_name}</h5>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {new Date(comment.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <p className="text-gray-800 leading-relaxed mb-3">
                      {comment.content}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{comment.likes || 0}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        <Reply className="h-4 w-4" />
                        Balas
                      </button>
                      
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
                        <Flag className="h-4 w-4" />
                        Laporkan
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center pt-6">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50"
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

      {/* Community Guidelines */}
      <div className="mt-12 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
        <h4 className="font-semibold text-gray-900 mb-3">Pedoman Berkomentar</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Gunakan bahasa yang sopan dan konstruktif</li>
          <li>• Hindari spam, promosi, atau konten yang tidak relevan</li>
          <li>• Hormati pendapat orang lain meskipun berbeda</li>
          <li>• Komentar yang melanggar akan dihapus oleh moderator</li>
        </ul>
      </div>
    </div>
  )
}