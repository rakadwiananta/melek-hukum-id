import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, FileText, X } from 'lucide-react';

// Tipe data untuk istilah hukum bisnis
interface BusinessLawTerm {
  id: number;
  term: string;
  category: string;
  definition: string;
  example: string;
  relatedTerms: string[];
  legalBasis: string;
}

// Array lengkap istilah hukum bisnis
const businessLawTerms: BusinessLawTerm[] = [
  {
    id: 1,
    term: "Acquisition",
    category: "corporate",
    definition: "Proses pengambilalihan kendali perusahaan oleh perusahaan lain melalui pembelian saham atau aset",
    example: "Akuisisi perusahaan startup oleh perusahaan teknologi besar",
    relatedTerms: ["Takeover", "Merger", "Buyout"],
    legalBasis: "UU Perseroan Terbatas Pasal 122-129"
  },
  {
    id: 2,
    term: "Act of God",
    category: "contracts",
    definition: "Kejadian tak terduga di luar kendali manusia yang membebaskan tanggung jawab kontrak",
    example: "Gempa bumi yang merusak pabrik dan menghalangi pemenuhan kontrak",
    relatedTerms: ["Force Majeure", "Keadaan Kahar"],
    legalBasis: "KUH Perdata Pasal 1244-1245"
  },
  {
    id: 3,
    term: "Administrative Law",
    category: "legal",
    definition: "Hukum yang mengatur kegiatan administrasi negara",
    example: "Pengajuan izin usaha melalui OSS",
    relatedTerms: ["Hukum Administrasi", "Hukum Tata Usaha Negara"],
    legalBasis: "UU Administrasi Pemerintahan"
  },
  {
    id: 4,
    term: "Addendum",
    category: "contracts",
    definition: "Tambahan atau lampiran pada kontrak yang memodifikasi ketentuan asli",
    example: "Addendum untuk perpanjangan masa kontrak",
    relatedTerms: ["Amendment", "Tambahan Kontrak"],
    legalBasis: "KUH Perdata Pasal 1320"
  },
  {
    id: 5,
    term: "Agency Agreement",
    category: "contracts",
    definition: "Perjanjian keagenan di mana agen bertindak atas nama principal",
    example: "Agen penjualan produk merek tertentu",
    relatedTerms: ["Keagenan", "Distribution Agreement"],
    legalBasis: "KUH Perdata Pasal 1792-1819"
  },
  {
    id: 6,
    term: "Agreement",
    category: "contracts",
    definition: "Kesepakatan antara dua pihak atau lebih yang mengikat secara hukum",
    example: "Perjanjian jual beli barang",
    relatedTerms: ["Kontrak", "Contract"],
    legalBasis: "KUH Perdata Pasal 1313"
  },
  {
    id: 7,
    term: "Aktiva Lancar",
    category: "accounting",
    definition: "Aset perusahaan yang dapat dikonversi menjadi kas dalam waktu kurang dari satu tahun",
    example: "Kas, piutang, dan persediaan barang",
    relatedTerms: ["Current Assets", "Aset Lancar"],
    legalBasis: "PSAK"
  },
  {
    id: 8,
    term: "Aktiva Tetap",
    category: "accounting",
    definition: "Aset jangka panjang yang digunakan dalam operasional bisnis",
    example: "Tanah, bangunan, dan mesin produksi",
    relatedTerms: ["Fixed Assets", "Aset Tetap"],
    legalBasis: "PSAK"
  },
  {
    id: 9,
    term: "Akuisisi",
    category: "corporate",
    definition: "Pengambilalihan perusahaan oleh perusahaan lain",
    example: "Akuisisi saham mayoritas perusahaan target",
    relatedTerms: ["Acquisition", "Takeover"],
    legalBasis: "UU PT Pasal 122-129"
  },
  {
    id: 10,
    term: "Anggaran Dasar",
    category: "corporate",
    definition: "Dokumen konstitusi perusahaan yang mengatur struktur dan operasi",
    example: "Anggaran dasar PT yang tercantum dalam akte pendirian",
    relatedTerms: ["Articles of Association", "Statuta"],
    legalBasis: "UU PT Pasal 8"
  },
  {
    id: 11,
    term: "Arbitrase",
    category: "legal",
    definition: "Penyelesaian sengketa oleh arbiter di luar pengadilan",
    example: "Arbitrase sengketa kontrak bisnis",
    relatedTerms: ["Arbitration", "APS"],
    legalBasis: "UU No. 30/1999"
  },
  {
    id: 12,
    term: "Audit",
    category: "accounting",
    definition: "Pemeriksaan laporan keuangan oleh auditor independen",
    example: "Audit tahunan oleh KAP",
    relatedTerms: ["Auditing", "Pemeriksaan Keuangan"],
    legalBasis: "Standar Audit"
  },
  {
    id: 13,
    term: "Badan Hukum",
    category: "corporate",
    definition: "Entitas yang diakui sebagai subjek hukum",
    example: "PT dan CV sebagai badan hukum",
    relatedTerms: ["Legal Entity", "Perseroan"],
    legalBasis: "KUH Perdata Pasal 1653"
  },
  {
    id: 14,
    term: "Balance Sheet",
    category: "accounting",
    definition: "Laporan neraca keuangan perusahaan",
    example: "Neraca menunjukkan aset dan liabilitas",
    relatedTerms: ["Neraca", "Financial Position"],
    legalBasis: "PSAK"
  },
  {
    id: 15,
    term: "Bankruptcy",
    category: "legal",
    definition: "Proses hukum untuk perusahaan pailit",
    example: "Pengajuan pailit ke pengadilan niaga",
    relatedTerms: ["Kepailitan", "Insolvency"],
    legalBasis: "UU No. 37/2004"
  },
  {
    id: 16,
    term: "Board of Directors",
    category: "corporate",
    definition: "Pengurus eksekutif perusahaan",
    example: "Direksi PT",
    relatedTerms: ["Direksi", "Executive Board"],
    legalBasis: "UU PT Pasal 92"
  },
  {
    id: 17,
    term: "Bond",
    category: "finance",
    definition: "Surat utang jangka menengah panjang",
    example: "Obligasi korporasi",
    relatedTerms: ["Obligasi", "Debt Security"],
    legalBasis: "UU Pasar Modal"
  },
  {
    id: 18,
    term: "Breach of Contract",
    category: "contracts",
    definition: "Pelanggaran ketentuan kontrak",
    example: "Keterlambatan pengiriman barang",
    relatedTerms: ["Wanprestasi", "Contract Violation"],
    legalBasis: "KUH Perdata Pasal 1243"
  },
  {
    id: 19,
    term: "Business License",
    category: "compliance",
    definition: "Izin usaha yang diperlukan untuk menjalankan bisnis",
    example: "SIUP untuk perusahaan perdagangan",
    relatedTerms: ["Izin Usaha", "Business Permit"],
    legalBasis: "UU Penanaman Modal"
  },
  {
    id: 20,
    term: "Capital Market",
    category: "finance",
    definition: "Pasar untuk perdagangan instrumen keuangan jangka panjang",
    example: "Bursa Efek Indonesia",
    relatedTerms: ["Pasar Modal", "Stock Market"],
    legalBasis: "UU No. 8/1995"
  },
  {
    id: 21,
    term: "Cash Flow",
    category: "accounting",
    definition: "Aliran masuk dan keluar kas perusahaan",
    example: "Laporan arus kas tahunan",
    relatedTerms: ["Arus Kas", "Cashflow"],
    legalBasis: "PSAK"
  },
  {
    id: 22,
    term: "CEO",
    category: "corporate",
    definition: "Chief Executive Officer: Eksekutif tertinggi perusahaan",
    example: "CEO mengelola operasional perusahaan",
    relatedTerms: ["Direktur Utama", "Top Executive"],
    legalBasis: "UU PT"
  },
  {
    id: 23,
    term: "Collateral",
    category: "finance",
    definition: "Aset yang dijaminkan untuk pinjaman",
    example: "Tanah sebagai collateral kredit",
    relatedTerms: ["Agunan", "Jaminan"],
    legalBasis: "UU Jaminan"
  },
  {
    id: 24,
    term: "Compliance",
    category: "compliance",
    definition: "Kepatuhan terhadap peraturan",
    example: "Departemen compliance perusahaan",
    relatedTerms: ["Kepatuhan", "Regulatory Compliance"],
    legalBasis: "Governance"
  },
  {
    id: 25,
    term: "Contract",
    category: "contracts",
    definition: "Perjanjian yang mengikat secara hukum",
    example: "Kontrak kerja sama bisnis",
    relatedTerms: ["Kontrak", "Agreement"],
    legalBasis: "KUH Perdata"
  },
  {
    id: 26,
    term: "Copyright",
    category: "intellectual-property",
    definition: "Hak cipta atas karya seni dan sastra",
    example: "Copyright buku dan musik",
    relatedTerms: ["Hak Cipta", "Intellectual Property"],
    legalBasis: "UU No. 28/2014"
  },
  {
    id: 27,
    term: "Corporate Governance",
    category: "compliance",
    definition: "Sistem pengelolaan dan pengawasan perusahaan",
    example: "Implementasi GCG di BUMN",
    relatedTerms: ["Tata Kelola Perusahaan", "GCG"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 28,
    term: "Corporate Social Responsibility",
    category: "compliance",
    definition: "Tanggung jawab sosial perusahaan",
    example: "CSR untuk lingkungan dan masyarakat",
    relatedTerms: ["CSR", "TJSL"],
    legalBasis: "UU PT Pasal 74"
  },
  {
    id: 29,
    term: "Credit Rating",
    category: "finance",
    definition: "Penilaian kelayakan kredit",
    example: "Rating kredit perusahaan oleh Pefindo",
    relatedTerms: ["Pemeringkatan Kredit", "Credit Score"],
    legalBasis: "Peraturan OJK"
  },
  {
    id: 30,
    term: "Dividend",
    category: "finance",
    definition: "Pembagian laba kepada pemegang saham",
    example: "Dividen tunai per saham",
    relatedTerms: ["Dividen", "Profit Sharing"],
    legalBasis: "UU PT Pasal 70"
  }
];

// Fungsi utilitas
const businessLawUtils = {
  getCategoryCounts: function() {
    const counts: { [key: string]: number } = {};
    businessLawTerms.forEach(term => {
      counts[term.category] = (counts[term.category] || 0) + 1;
    });
    return counts;
  },

  searchTerms: function(query: string) {
    const searchQuery = query.toLowerCase();
    return businessLawTerms.filter(term =>
      term.term.toLowerCase().includes(searchQuery) ||
      term.definition.toLowerCase().includes(searchQuery) ||
      term.example.toLowerCase().includes(searchQuery) ||
      term.relatedTerms.some(rt => rt.toLowerCase().includes(searchQuery))
    );
  },

  filterByCategory: function(category: string) {
    return businessLawTerms.filter(term => term.category === category);
  },

  getRandomTerm: function() {
    const randomIndex = Math.floor(Math.random() * businessLawTerms.length);
    return businessLawTerms[randomIndex];
  },

  exportToCSV: function() {
    const headers = ['ID', 'Term', 'Category', 'Definition', 'Example', 'Related Terms', 'Legal Basis'];
    const csvContent = [
      headers.join(','),
      ...businessLawTerms.map(term => [
        term.id,
        `"${term.term}"`,
        term.category,
        `"${term.definition}"`,
        `"${term.example}"`,
        `"${term.relatedTerms.join('; ')}"`,
        `"${term.legalBasis}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'istilah-hukum-bisnis.csv';
    link.click();
  },

  exportToJSON: function() {
    const dataStr = JSON.stringify(businessLawTerms, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'istilah-hukum-bisnis.json';
    link.click();
  }
};

// Komponen React untuk menampilkan istilah
export const BusinessLawDictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState<BusinessLawTerm | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = selectedCategory === 'all' 
      ? businessLawTerms 
      : businessLawUtils.filterByCategory(selectedCategory);
    
    if (searchQuery) {
      terms = terms.filter(term =>
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return terms;
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => businessLawUtils.getCategoryCounts(), []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Kamus Istilah Hukum Bisnis</h1>
        <p className="text-blue-100">
          {businessLawTerms.length} istilah hukum bisnis lengkap dengan definisi dan contoh
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari istilah hukum bisnis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kategori ({businessLawTerms.length})</option>
              <option value="corporate">Corporate ({categoryCounts.corporate || 0})</option>
              <option value="contracts">Contracts ({categoryCounts.contracts || 0})</option>
              <option value="finance">Finance ({categoryCounts.finance || 0})</option>
              <option value="accounting">Accounting ({categoryCounts.accounting || 0})</option>
              <option value="compliance">Compliance ({categoryCounts.compliance || 0})</option>
              <option value="legal">Legal ({categoryCounts.legal || 0})</option>
              <option value="intellectual-property">IP ({categoryCounts['intellectual-property'] || 0})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-gray-600">
          Menampilkan {filteredTerms.length} istilah
        </p>
      </div>

      {/* Terms Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((term) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedTerm(term)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{term.term}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(term.category)}`}>
                    {term.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{term.definition}</p>
                <p className="text-gray-500 text-xs italic line-clamp-2">
                  Contoh: {term.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTerm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTerm.term}</h2>
                    <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedTerm.category)}`}>
                      {selectedTerm.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTerm(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Definisi</h3>
                    <p className="text-gray-600">{selectedTerm.definition}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Contoh</h3>
                    <p className="text-gray-600 italic">{selectedTerm.example}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Istilah Terkait</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.relatedTerms.map((rt, idx) => (
                        <span
                          key={idx}
                          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                          {rt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Dasar Hukum</h3>
                    <p className="text-gray-600">{selectedTerm.legalBasis}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button
          onClick={() => businessLawUtils.exportToJSON()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </button>
        <button
          onClick={() => businessLawUtils.exportToCSV()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
};

// Fungsi helper untuk warna kategori
function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    corporate: 'bg-blue-100 text-blue-700',
    contracts: 'bg-green-100 text-green-700',
    finance: 'bg-purple-100 text-purple-700',
    accounting: 'bg-pink-100 text-pink-700',
    compliance: 'bg-red-100 text-red-700',
    legal: 'bg-gray-100 text-gray-700',
    'intellectual-property': 'bg-indigo-100 text-indigo-700'
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
}

export { businessLawTerms, businessLawUtils };
