'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/app/lib/utils'
import { QuizQuestion as QuizQuestionType } from './QuizData'
import { CheckCircle, XCircle, AlertCircle, Lightbulb, BookOpen, Star, Zap, Brain, Target, Award, ArrowRight, Gavel, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

interface QuizQuestionProps {
  question: QuizQuestionType
  currentQuestion: number
  totalQuestions: number
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
  onNext: () => void
  showResult: boolean
}

// 3D Batik Background Component
const BatikQuestionBackground = ({ pattern = 'kawung' }: { pattern?: string }) => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-5" viewBox="0 0 400 400">
        <defs>
          {pattern === 'kawung' && (
            <pattern id="kawung-quiz" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <motion.circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <circle cx="25" cy="25" r="10" fill="currentColor" className="text-blue-500" opacity="0.3" />
            </pattern>
          )}
          {pattern === 'parang' && (
            <pattern id="parang-quiz" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <motion.path
                d="M0,20 L20,0 L40,20 L20,40 Z"
                fill="currentColor"
                className="text-purple-500"
                opacity="0.2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pattern}-quiz)`} />
      </svg>
    </motion.div>
  )
}

// 3D Answer Option Component
interface AnswerOption3DProps {
  option: string
  index: number
  isSelected: boolean
  isCorrect: boolean
  isWrong: boolean
  showResult: boolean
  onSelect: (index: number) => void
  isMobile: boolean
}

const AnswerOption3D = ({ 
  option, 
  index, 
  isSelected, 
  isCorrect, 
  isWrong, 
  showResult, 
  onSelect,
  isMobile 
}: AnswerOption3DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const getOptionStyle = () => {
    if (showResult && isCorrect) return "border-green-500 bg-gradient-to-br from-green-50 to-green-100"
    if (showResult && isWrong) return "border-red-500 bg-gradient-to-br from-red-50 to-red-100"
    if (isSelected && !showResult) return "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100"
    return "border-gray-200 bg-white hover:border-gray-300"
  }

  const getIconColor = () => {
    if (showResult && isCorrect) return "bg-green-500 text-white"
    if (showResult && isWrong) return "bg-red-500 text-white"
    if (isSelected && !showResult) return "bg-blue-500 text-white"
    return "bg-gray-200 text-gray-700"
  }

  return (
    <motion.button
      onClick={() => !showResult && onSelect(index)}
      disabled={showResult}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      initial={{ opacity: 0, x: -50, rotateY: -20 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        rotateY: isHovered && !showResult ? 5 : 0,
        scale: isHovered && !showResult ? 1.02 : 1
      }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      whileTap={!showResult ? { scale: 0.98 } : {}}
      className={cn(
        "w-full p-4 md:p-5 text-left rounded-xl border-2 transition-all relative overflow-hidden",
        getOptionStyle(),
        showResult && "cursor-default"
      )}
      style={{ 
        transformStyle: 'preserve-3d',
        boxShadow: isHovered && !showResult ? '0 10px 30px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      {/* Animated Background Pattern */}
      {(isSelected || showResult) && (
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='currentColor' stroke-width='0.5'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      )}

      <div className="flex items-center gap-3 relative z-10">
        {/* 3D Option Letter */}
        <motion.div
          className={cn(
            "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all",
            getIconColor()
          )}
          animate={isSelected || (showResult && (isCorrect || isWrong)) ? {
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {String.fromCharCode(65 + index)}
        </motion.div>
        
        <span className="flex-1 text-sm md:text-base">{option}</span>
        
        {/* Result Icons with 3D Animation */}
        <AnimatePresence>
          {showResult && isCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
            </motion.div>
          )}
          {showResult && isWrong && (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Effect Glow */}
      {isHovered && !showResult && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  )
}

// 3D Explanation Card Component
const ExplanationCard3D = ({ question, isCorrect }: { question: QuizQuestionType; isCorrect: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className={`mt-6 p-4 md:p-6 rounded-xl relative overflow-hidden ${
        isCorrect 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
          : 'bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Wayang Shadow Decoration */}
      <motion.div
        className="absolute -right-10 -bottom-10 w-32 h-32 opacity-10"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M50 20 Q30 40 40 60 L40 80 Q50 90 60 80 L60 60 Q70 40 50 20"
            fill="currentColor"
            className={isCorrect ? "text-green-600" : "text-red-600"}
          />
        </svg>
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Lightbulb className={`w-5 h-5 md:w-6 md:h-6 ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`} />
          </motion.div>
          <h4 className={`font-bold text-base md:text-lg ${
            isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {isCorrect ? 'Benar! Penjelasan:' : 'Penjelasan:'}
          </h4>
        </div>
        
        {question.explanation && (
          <motion.p 
            className={`text-sm md:text-base ${
              isCorrect ? 'text-green-700' : 'text-red-700'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {question.explanation}
          </motion.p>
        )}

        {/* Fun Fact or Additional Info */}
        {question.explanation && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-3 p-3 bg-white/50 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-gray-600 mt-0.5" />
              <p className="text-xs md:text-sm text-gray-700">
                <span className="font-semibold">Tahukah Anda?</span> Penjelasan ini membantu Anda memahami konsep anti-korupsi dengan lebih baik.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  showResult
}: QuizQuestionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const isCorrect = selectedAnswer === question.correctAnswer

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const getDifficultyColor = () => {
    switch(question.difficulty) {
      case 'Mudah': return 'bg-green-100 text-green-700'
      case 'Sedang': return 'bg-yellow-100 text-yellow-700'
      case 'Sulit': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDifficultyLabel = () => {
    switch(question.difficulty) {
      case 'Mudah': return 'Mudah'
      case 'Sedang': return 'Sedang'
      case 'Sulit': return 'Sulit'
      default: return 'Mudah'
    }
  }

  const getCategoryIcon = () => {
    switch(question.category) {
      case 'korupsi': return BookOpen
      case 'gratifikasi': return Gavel
      case 'suap': return AlertCircle
      case 'penyalahgunaan': return Shield
      default: return Star
    }
  }

  const CategoryIcon = getCategoryIcon()

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6 relative"
    >
      {/* Batik Background Pattern */}
      <BatikQuestionBackground pattern={currentQuestion % 2 === 0 ? 'kawung' : 'parang'} />

      {/* Question Card with 3D Effect */}
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 md:p-6 rounded-xl relative overflow-hidden"
        initial={{ rotateX: -10 }}
        animate={{ rotateX: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Garuda Wing Decoration */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 opacity-10"
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M50 20 Q20 10 10 30 Q20 25 50 40 Q80 25 90 30 Q80 10 50 20"
              fill="currentColor"
              className="text-blue-600"
            />
          </svg>
        </motion.div>

        <div className="relative z-10">
          {/* Question Header */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <motion.span 
              className={`px-3 py-1 ${getDifficultyColor()} text-xs font-medium rounded-full flex items-center gap-1`}
              whileHover={{ scale: 1.05 }}
            >
              <CategoryIcon className="w-3 h-3" />
              {question.category.toUpperCase()}
            </motion.span>
            <motion.span 
              className={`px-3 py-1 ${getDifficultyColor()} text-xs font-medium rounded-full`}
              whileHover={{ scale: 1.05 }}
            >
              {getDifficultyLabel()}
            </motion.span>
            <motion.span 
              className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-3 h-3" />
              10 poin
            </motion.span>
          </div>
          
          {/* Question Text with 3D Effect */}
          <motion.h3 
            className="text-base md:text-lg font-semibold text-gray-900"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {question.text}
          </motion.h3>
        </div>
      </motion.div>

      {/* Answer Options with 3D Animation */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <AnswerOption3D
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            isCorrect={showResult && index === question.correctAnswer}
            isWrong={showResult && selectedAnswer === index && !isCorrect}
            showResult={showResult}
            onSelect={onSelectAnswer}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Explanation Card */}
      <AnimatePresence>
        {showResult && (
          <ExplanationCard3D question={question} isCorrect={isCorrect} />
        )}
      </AnimatePresence>

      {/* Action Button with 3D Effect */}
      <motion.div 
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {!showResult ? (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={selectedAnswer === null}
            className={cn(
              "px-6 md:px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2",
              selectedAnswer !== null
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            style={{
              boxShadow: selectedAnswer !== null ? '0 10px 25px rgba(59, 130, 246, 0.3)' : 'none'
            }}
          >
            <Target className="w-5 h-5" />
            Cek Jawaban
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-6 md:px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            style={{
              boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)'
            }}
          >
            {currentQuestion < totalQuestions - 1 ? 'Lanjut' : 'Selesai'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
