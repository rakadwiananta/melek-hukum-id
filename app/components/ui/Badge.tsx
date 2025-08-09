interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'xs' | 'sm' | 'md'
    animated?: boolean
  }
  
  export default function Badge({ 
    children, 
    variant = 'default', 
    size = 'sm',
    animated = false 
  }: BadgeProps) {
    const getVariantClasses = () => {
      const baseClasses = {
        default: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white border-gray-400 shadow-gray-300',
        success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-300 shadow-green-300',
        warning: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-300 shadow-orange-300',
        danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-300 shadow-red-300',
        info: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-300 shadow-blue-300'
      }
      return baseClasses[variant]
    }
  
    const getSizeClasses = () => {
      const sizeClasses = {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-1.5 text-sm'
      }
      return sizeClasses[size]
    }
  
    const getAnimationClasses = () => {
      if (!animated) return ''
      
      const animationClasses = {
        success: 'animate-pulse-success',
        warning: 'animate-pulse-warning',
        danger: 'animate-pulse-danger',
        default: '',
        info: 'animate-pulse-info'
      }
      return animationClasses[variant]
    }
  
    return (
      <>
        <span 
          className={`
            inline-flex items-center rounded-full font-medium
            border shadow-sm transition-all duration-300
            hover:shadow-md hover:scale-110 hover:-translate-y-0.5
            backdrop-blur-sm relative overflow-hidden
            ${getVariantClasses()}
            ${getSizeClasses()}
            ${getAnimationClasses()}
          `}
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 -top-full animate-shimmer bg-gradient-to-b from-transparent via-white/20 to-transparent"></span>
          
          {/* Badge content */}
          <span className="relative z-10">{children}</span>
        </span>
  
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
          
          @keyframes pulse-success {
            0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(34, 197, 94, 0); }
          }
          
          @keyframes pulse-warning {
            0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(249, 115, 22, 0); }
          }
          
          @keyframes pulse-danger {
            0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0); }
          }
          
          @keyframes pulse-info {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0); }
          }
          
          .animate-shimmer {
            animation: shimmer 3s ease-in-out infinite;
          }
          
          .animate-pulse-success {
            animation: pulse-success 2s ease-in-out infinite;
          }
          
          .animate-pulse-warning {
            animation: pulse-warning 2s ease-in-out infinite;
          }
          
          .animate-pulse-danger {
            animation: pulse-danger 2s ease-in-out infinite;
          }
          
          .animate-pulse-info {
            animation: pulse-info 2s ease-in-out infinite;
          }
        `}</style>
      </>
    )
  }
  