// Export template components
export { default as TemplateDetail } from './TemplateDetail'

// Export template data
export {
  LEGAL_TEMPLATES,
  TEMPLATE_STATISTICS,
  TEMPLATE_CATEGORIES,
  getTemplatesByCategory,
  getPopularTemplates,
  getLatestTemplates,
  searchTemplates
} from './TemplateData'

// Export individual templates
export {
  SURAT_PERJANJIAN_SEWA_RUMAH_TEMPLATE,
  SURAT_PERJANJIAN_SEWA_RUMAH_CONTENT,
  SURAT_PERJANJIAN_SEWA_RUMAH_GUIDE,
  SURAT_PERJANJIAN_SEWA_RUMAH_REFERENCES
} from './templates/surat-perjanjian-sewa-rumah'

export {
  SURAT_PERJANJIAN_JUAL_BELI_TEMPLATE,
  SURAT_PERJANJIAN_JUAL_BELI_CONTENT,
  SURAT_PERJANJIAN_JUAL_BELI_GUIDE,
  SURAT_PERJANJIAN_JUAL_BELI_REFERENCES
} from './templates/surat-perjanjian-jual-beli'

// Export template registry
export {
  TEMPLATE_REGISTRY,
  getTemplateData
} from './templates' 