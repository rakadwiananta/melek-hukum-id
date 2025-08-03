'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '@/app/components/ui/PageHeader'
import QuizQuestion from '@/app/components/tools/QuizQuestion'
import QuizResult from '@/app/components/tools/QuizResult'
import QuizProgress from '@/app/components/tools/QuizProgress'
import QuizTimer from '@/app/components/tools/QuizTimer'
import QuizExplanation from '@/app/components/tools/QuizExplanation'
import QuizStats from '@/app/components/tools/QuizStats'
import QuizSummary from '@/app/components/tools/QuizSummary'
import QuizRecommendations from '@/app/components/tools/QuizRecommendations'
import QuizLeaderboard from '@/app/components/tools/QuizLeaderboard'
import QuizCertificate from '@/app/components/tools/QuizCertificate'
import QuizFeedback from '@/app/components/tools/QuizFeedback'
import { MobileAd } from '@/app/components/ads/AdPlacements'
import { 
  quizData, 
  QuizQuestion as QuizQuestionType,
  getQuestionsByLevelAndTopic,
  getAvailableTopics,
  getQuizStatistics
} from '@/app/components/tools/QuizData'
import { 
  Shield, 
  BookOpen, 
  Target, 
  AlertTriangle,
  Building2,
  Briefcase,
  Megaphone,
  Scale,
  Lock,
  CheckCircle,
  Clock,
  RotateCw,
  Trophy,
  Brain,
  Sparkles,
  ChevronRight,
  Star,
  Zap,
  Award,
  Info,
  ArrowRight,
  Users,
  FileText,
  Gavel,
  Heart,
  Eye,
  TrendingUp
} from 'lucide-react'

// Quiz Level Configuration
const quizLevels = [
  {
    id: 'pemula',
    name: 'Level Pemula',
    description: 'Untuk pelajar & masyarakat umum',
    icon: '🌱',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    features: [
      { icon: CheckCircle, text: '15 soal pilihan ganda', value: 15 },
      { icon: Clock, text: '20 menit waktu', value: 20 },
      { icon: Target, text: 'Passing grade 60%', value: 60 },
      { icon: RotateCw, text: 'Unlimited retry', value: 'unlimited' }
    ],
    locked: false,
    questions: 15,
    duration: 20,
    passingGrade: 60
  },
  {
    id: 'menengah',
    name: 'Level Menengah',
    description: 'Untuk mahasiswa & profesional',
    icon: '🍃',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    features: [
      { icon: CheckCircle, text: '25 soal campuran', value: 25 },
      { icon: Clock, text: '30 menit waktu', value: 30 },
      { icon: Target, text: 'Passing grade 70%', value: 70 },
      { icon: RotateCw, text: '3x retry per hari', value: 3 }
    ],
    locked: false,
    questions: 25,
    duration: 30,
    passingGrade: 70
  },
  {
    id: 'lanjutan',
    name: 'Level Lanjutan',
    description: 'Untuk praktisi & penegak hukum',
    icon: '🌳',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    features: [
      { icon: CheckCircle, text: '35 soal + case study', value: 35 },
      { icon: Clock, text: '45 menit waktu', value: 45 },
      { icon: Target, text: 'Passing grade 80%', value: 80 },
      { icon: RotateCw, text: '1x retry per hari', value: 1 }
    ],
    locked: true,
    questions: 35,
    duration: 45,
    passingGrade: 80
  }
]

// Quiz Topics Configuration
const quizTopics = [
  {
    id: 'dasar-hukum',
    title: 'Dasar Hukum Antikorupsi',
    questions: 35,
    level: 'Pemula',
    levelColor: 'bg-green-100 text-green-700',
    icon: Scale,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    category: 'fundamental'
  },
  {
    id: 'bentuk-korupsi',
    title: '30 Bentuk Korupsi',
    questions: 50,
    level: 'Pemula',
    levelColor: 'bg-green-100 text-green-700',
    icon: Target,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    category: 'types'
  },
  {
    id: 'pencegahan',
    title: 'Pencegahan & Pemberantasan',
    questions: 35,
    level: 'Menengah',
    levelColor: 'bg-blue-100 text-blue-700',
    icon: Shield,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    category: 'prevention'
  },
  {
    id: 'whistleblowing',
    title: 'Whistleblowing System',
    questions: 25,
    level: 'Pemula',
    levelColor: 'bg-green-100 text-green-700',
    icon: Megaphone,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    category: 'reporting'
  },
  {
    id: 'uu-tipikor',
    title: 'UU Tipikor & Perubahan',
    questions: 45,
    level: 'Menengah',
    levelColor: 'bg-blue-100 text-blue-700',
    icon: BookOpen,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    category: 'law'
  },
  {
    id: 'modus-operandi',
    title: 'Modus Operandi Terkini',
    questions: 40,
    level: 'Lanjutan',
    levelColor: 'bg-purple-100 text-purple-700',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    category: 'modus'
  },
  {
    id: 'studi-kasus',
    title: 'Studi Kasus Besar',
    questions: 30,
    level: 'Lanjutan',
    levelColor: 'bg-purple-100 text-purple-700',
    icon: Briefcase,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    category: 'cases'
  },
  {
    id: 'kpk-apip',
    title: 'Peran KPK & APIP',
    questions: 30,
    level: 'Menengah',
    levelColor: 'bg-blue-100 text-blue-700',
    icon: Building2,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    category: 'institution'
  }
]

// 3D Batik Pattern Component
const BatikPattern3D = ({ pattern = 'kawung', className = "" }: { pattern?: string; className?: string }) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isMobile ? 0.02 : 0.03 }}
      transition={{ duration: 2 }}
    >
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          {pattern === 'kawung' && (
            <pattern id="kawung-3d" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <motion.g
                animate={!isMobile ? { rotate: 360 } : {}}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "30px 30px" }}
              >
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2"/>
                <circle cx="30" cy="30" r="5" fill="currentColor" opacity="0.1"/>
              </motion.g>
            </pattern>
          )}
          {pattern === 'parang' && (
            <pattern id="parang-3d" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <motion.path
                d="M0,40 L40,0 L80,40 L40,80 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.2"
                animate={!isMobile ? {
                  d: [
                    "M0,40 L40,0 L80,40 L40,80 Z",
                    "M10,40 L40,10 L70,40 L40,70 Z",
                    "M0,40 L40,0 L80,40 L40,80 Z"
                  ]
                } : {}}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </pattern>
          )}
          {pattern === 'megamendung' && (
            <pattern id="megamendung-3d" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <motion.path
                d="M50,20 Q30,40 50,60 T50,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
                animate={!isMobile ? {
                  d: [
                    "M50,20 Q30,40 50,60 T50,20",
                    "M50,15 Q25,35 50,55 T50,15",
                    "M50,20 Q30,40 50,60 T50,20"
                  ]
                } : {}}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pattern}-3d)`} />
      </svg>
    </motion.div>
  )
}

// 3D Wayang Component for decoration
const Wayang3D = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
    >
      <motion.svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        animate={{
          rotateY: [0, 10, -10, 0],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <path
          d="M100 50 C70 50 50 70 50 100 L50 150 L30 170 L30 200 L50 190 L50 250 L80 280 L120 280 L150 250 L150 190 L170 200 L170 170 L150 150 L150 100 C150 70 130 50 100 50 Z"
          fill="currentColor"
        />
        <circle cx="80" cy="90" r="5" fill="white" />
        <circle cx="120" cy="90" r="5" fill="white" />
      </motion.svg>
    </motion.div>
  )
}

interface LevelCard3DProps {
  level: any
  index: number
  onSelect: (level: any) => void
  isSelected: boolean
}

// 3D Level Card Component
const LevelCard3D = ({ level, index, onSelect, isSelected }: LevelCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="relative"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <motion.div
        animate={{
          rotateY: isHovered && !level.locked ? 5 : 0,
          scale: isHovered && !level.locked ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative ${level.bgColor} p-6 md:p-8 rounded-2xl border-2 ${
          isSelected ? 'ring-4 ring-blue-500' : ''
        } ${level.borderColor} ${
          level.locked ? 'opacity-60' : 'cursor-pointer hover:shadow-2xl'
        } transition-all overflow-hidden`}
        onClick={() => !level.locked && onSelect(level)}
      >
        {/* Batik Pattern Background */}
        <BatikPattern3D pattern={index === 0 ? 'kawung' : index === 1 ? 'parang' : 'megamendung'} className={level.textColor} />

        {/* Selected Checkmark */}
        {isSelected && !level.locked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center z-20"
          >
            <CheckCircle className="w-5 h-5" />
          </motion.div>
        )}

        {/* Lock Overlay */}
        {level.locked && (
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-12 h-12 text-gray-700 mb-2" />
            </motion.div>
            <p className="text-sm text-gray-700 font-medium">
              Selesaikan level sebelumnya untuk membuka
            </p>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon & Title */}
          <div className="text-center mb-6">
            <motion.div
              className="text-5xl md:text-6xl mb-3"
              animate={{ 
                scale: isHovered && !level.locked ? [1, 1.2, 1] : 1,
                rotate: isHovered && !level.locked ? [0, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {level.icon}
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {level.name}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {level.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {level.features.map((feature: any, idx: number) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Icon className={`w-5 h-5 ${level.textColor}`} />
                  <span className="text-sm md:text-base text-gray-700">{feature.text}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 3D Shadow Effect */}
        <motion.div
          className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-xl rounded-full"
          animate={{
            scale: isHovered && !level.locked ? 1.1 : 1,
            opacity: isHovered && !level.locked ? 0.3 : 0.1
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// 3D Topic Card Component
interface TopicCard3DProps {
  topic: any
  index: number
  isSelected: boolean
  onSelect: (topic: any) => void
  disabled: boolean
}

const TopicCard3D = ({ topic, index, isSelected, onSelect, disabled }: TopicCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const Icon = topic.icon

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const isLocked = topic.level === 'Lanjutan' && disabled

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring" }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      whileHover={!isLocked && !isMobile ? { y: -5 } : {}}
      className={`relative ${isLocked ? 'opacity-60' : ''}`}
    >
      <motion.div
        className={`bg-white p-5 md:p-6 rounded-xl shadow-lg border-2 ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
        } ${
          !isLocked ? 'hover:shadow-xl cursor-pointer' : ''
        } transition-all relative overflow-hidden`}
        animate={{
          rotateX: isHovered && !isLocked ? 5 : 0,
          rotateY: isHovered && !isLocked ? 5 : 0
        }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => !isLocked && onSelect(topic)}
      >
        {/* Decorative Background */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 opacity-5"
          animate={{
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 20 }}
        >
          <Icon className="w-full h-full" />
        </motion.div>

        {/* Selected Checkmark */}
        {isSelected && !isLocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center z-20"
          >
            <CheckCircle className="w-4 h-4" />
          </motion.div>
        )}

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm rounded-xl flex items-center justify-center z-20">
            <Lock className="w-8 h-8 text-gray-600" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-12 h-12 ${topic.iconBg} rounded-lg flex items-center justify-center mb-4`}
            whileHover={!isLocked ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-6 h-6 ${topic.iconColor}`} />
          </motion.div>

          {/* Title & Info */}
          <h4 className="font-bold text-gray-900 mb-1">{topic.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{topic.questions} pertanyaan</p>
          
          {/* Level Badge */}
          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${topic.levelColor}`}>
            {topic.level}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function KuisKorupsiPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null)
  const [isQuizActive, setIsQuizActive] = useState(false)
  
  // New states for level and topic selection
  const [selectedLevel, setSelectedLevel] = useState<any>(null)
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [showLevelSelection, setShowLevelSelection] = useState(true)
  const [showTopicSelection, setShowTopicSelection] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // State for filtered questions
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestionType[]>([])
  const [quizStatistics, setQuizStatistics] = useState<any>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize quiz statistics
  useEffect(() => {
    const stats = getQuizStatistics()
    setQuizStatistics(stats)
    console.log('Quiz Statistics:', stats)
  }, [])

  useEffect(() => {
    if (isQuizActive && quizStartTime) {
      const timer = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - quizStartTime) / 1000))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isQuizActive, quizStartTime])

  const handleLevelSelect = (level: any) => {
    setSelectedLevel(level)
    setShowLevelSelection(false)
    setShowTopicSelection(true)
  }

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic)
  }

  const startQuiz = () => {
    if (selectedLevel && selectedTopic) {
      // Get filtered questions based on level and topic
      const questions = getQuestionsByLevelAndTopic(selectedLevel.id, selectedTopic.id)
      
      if (questions.length === 0) {
        alert('Tidak ada soal yang tersedia untuk kombinasi level dan topik ini. Silakan pilih kombinasi lain.')
        return
      }
      
      setFilteredQuestions(questions)
      setShowTopicSelection(false)
      setIsQuizActive(true)
      setQuizStartTime(Date.now())
      setCurrentQuestion(0)
      setAnswers([])
      setShowResult(false)
      setShowExplanation(false)
      setTimeSpent(0)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleContinue = () => {
    setShowExplanation(false)
    
    const questionsToUse = filteredQuestions.length > 0 ? filteredQuestions : quizData
    
    if (currentQuestion < questionsToUse.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 500)
    } else {
      setIsQuizActive(false)
      setShowResult(true)
    }
  }

  const handleTimeUp = () => {
    setIsQuizActive(false)
    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setShowExplanation(false)
    setTimeSpent(0)
    setQuizStartTime(null)
    setIsQuizActive(false)
    setSelectedLevel(null)
    setSelectedTopic(null)
    setShowLevelSelection(true)
    setShowTopicSelection(false)
    setFilteredQuestions([])
  }

  const calculateScore = () => {
    const questionsToUse = filteredQuestions.length > 0 ? filteredQuestions : quizData
    return answers.reduce((score, answer, index) => {
      return answer === questionsToUse[index].correctAnswer ? score + 1 : score
    }, 0)
  }

  const getCurrentQuestionData = (): QuizQuestionType => {
    return filteredQuestions[currentQuestion] || quizData[currentQuestion]
  }

  // Show level selection
  if (showLevelSelection && !isQuizActive && !showResult) {
    return (
      <>
        <PageHeader
          title="Kuis Anti-Korupsi Interaktif"
          description="Test pemahaman Anda tentang korupsi dengan kuis interaktif berbasis kearifan lokal Indonesia"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Kuis Anti-Korupsi' },
          ]}
        />

        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Decorations */}
          {!isMobile && (
            <Wayang3D className="top-20 right-10 w-48 h-72 text-orange-200" />
          )}
          
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Pilih Level Kuis Anda
              </h2>
            </motion.div>

            {/* Level Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {quizLevels.map((level, index) => (
                <LevelCard3D
                  key={level.id}
                  level={level}
                  index={index}
                  onSelect={handleLevelSelect}
                  isSelected={selectedLevel?.id === level.id}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  // Show topic selection
  if (showTopicSelection && !isQuizActive && !showResult) {
    return (
      <>
        <PageHeader
          title="Kuis Anti-Korupsi Interaktif"
          description="Test pemahaman Anda tentang korupsi dengan kuis interaktif berbasis kearifan lokal Indonesia"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Kuis Anti-Korupsi' },
          ]}
        />

        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Decorations */}
          {!isMobile && (
            <Wayang3D className="top-20 right-10 w-48 h-72 text-blue-200" />
          )}

          <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setShowTopicSelection(false)
                setShowLevelSelection(true)
                setSelectedLevel(null)
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Kembali ke pemilihan level</span>
            </motion.button>

            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Topik Kuis Tersedia
                </h2>
              </div>
              <p className="text-gray-600">
                Level yang dipilih: <span className="font-semibold">{selectedLevel?.name}</span>
              </p>
            </motion.div>

            {/* Topic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-8">
              {quizTopics.map((topic, index) => (
                <TopicCard3D
                  key={topic.id}
                  topic={topic}
                  index={index}
                  isSelected={selectedTopic?.id === topic.id}
                  onSelect={handleTopicSelect}
                  disabled={selectedLevel?.id === 'pemula' && topic.level === 'Lanjutan'}
                />
              ))}
            </div>

            {/* Start Quiz Button */}
            <AnimatePresence>
              {selectedTopic && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-md mx-auto"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startQuiz}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Mulai Kuis: {selectedTopic.title}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <MobileAd className="mt-8" />
          </div>
        </div>
      </>
    )
  }

  // Show quiz interface
  return (
    <>
      <PageHeader
        title="Kuis: Apakah Ini Korupsi?"
        description="Test pemahaman Anda tentang korupsi dan gratifikasi"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Kuis Anti-Korupsi' },
        ]}
      />

      <div className="container-padding mx-auto max-w-3xl py-8">
        {!showResult ? (
          <>
            {/* Quiz Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="text-3xl">{selectedLevel?.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedLevel?.name}</p>
                  <p className="text-sm text-gray-600">{selectedTopic?.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Trophy className="w-4 h-4" />
                  <span>Passing: {selectedLevel?.passingGrade}%</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{selectedLevel?.duration} menit</span>
                </div>
              </div>
            </motion.div>

            {/* Timer */}
            <QuizTimer
              duration={selectedLevel?.duration * 60 || quizData.length * 90}
              onTimeUp={handleTimeUp}
              className="mb-6"
            />

            {/* Progress Bar */}
            <QuizProgress
              currentQuestion={currentQuestion}
              totalQuestions={filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length)}
              className="mb-6"
            />

            {/* Question */}
            <QuizQuestion
              question={getCurrentQuestionData()}
              currentQuestion={currentQuestion + 1}
              totalQuestions={filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length)}
              selectedAnswer={answers[currentQuestion]}
              onSelectAnswer={handleAnswer}
              onNext={handleContinue}
              showResult={showExplanation}
            />

            {/* Explanation */}
            {showExplanation && (
              <QuizExplanation
                isCorrect={answers[currentQuestion] === getCurrentQuestionData().correctAnswer}
                explanation={getCurrentQuestionData().explanation}
                correctAnswer={getCurrentQuestionData().options[getCurrentQuestionData().correctAnswer]}
                userAnswer={getCurrentQuestionData().options[answers[currentQuestion]]}
                onContinue={handleContinue}
              />
            )}

            <MobileAd className="mt-8" />
          </>
        ) : (
          <div className="space-y-6">
            <QuizResult
              score={calculateScore()}
              totalQuestions={filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length)}
              correctAnswers={calculateScore()}
              onRestart={resetQuiz}
            />
            
            <QuizStats
              score={calculateScore()}
              totalQuestions={filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length)}
              timeSpent={timeSpent}
            />

            <QuizSummary
              answers={answers}
            />

            <QuizRecommendations
              answers={answers}
            />

            <QuizLeaderboard
              currentScore={Math.round((calculateScore() / (filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length))) * 100)}
              currentTime={timeSpent}
            />

            <QuizCertificate
              score={calculateScore()}
              totalQuestions={filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length)}
              timeSpent={timeSpent}
            />

            <QuizFeedback
              score={Math.round((calculateScore() / (filteredQuestions.length > 0 ? filteredQuestions.length : (selectedLevel?.questions || quizData.length))) * 100)}
            />

            <MobileAd className="mt-8" />
          </div>
        )}
      </div>
    </>
  )
}
