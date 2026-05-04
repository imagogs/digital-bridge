import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, TrendingUp, AlertTriangle, Download, Search, ChevronDown, Shield, MailCheck, Video, FileText, Table2, Building2, CheckCircle2, Clock, Loader2, RefreshCw } from 'lucide-react';
import { fetchAllStudentProgress, type StudentData } from '../lib/coordinatorQueries';

const moduleColumns = [
  { id: 'spid', label: 'SPID', icon: Shield, color: '#1d4ed8' },
  { id: 'pec', label: 'PEC', icon: MailCheck, color: '#4f46e5' },
  { id: 'emailMod', label: 'Email', icon: Video, color: '#059669' },
  { id: 'word', label: 'Word', icon: FileText, color: '#1e40af' },
  { id: 'excel', label: 'Excel', icon: Table2, color: '#15803d' },
  { id: 'portaliPa', label: 'PA', icon: Building2, color: '#7c3aed' },
];

function ProgressCell({ pct }: { pct: number }) {
  const color = pct === 100 ? '#22c55e' : pct > 50 ? '#3b82f6' : pct > 0 ? '#f59e0b' : '#374151';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-white/50 text-xs w-8">{pct}%</span>
    </div>
  );
}

interface CoordinatorPanelProps {
  onClose: () => void;
}

export function CoordinatorPanel({ onClose }: CoordinatorPanelProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'at-risk' | 'complete'>('all');
  const [showExportToast, setShowExportToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'students' | 'alerts' | 'stats'>('students');
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadStudents = async () => {
    setLoadingData(true);
    setLoadError(null);
    try {
      const data = await fetchAllStudentProgress();
      setStudents(data);
    } catch (e) {
      console.error('CoordinatorPanel: load error', e);
      setLoadError('Impossibile caricare i dati. Verifica la connessione e i permessi RLS.');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { loadStudents(); }, []);

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.contactEmail.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  });

  const alerts = students.filter(s => s.alert);
  const activeCount = students.filter(s => s.status === 'active').length;
  const completedCount = students.filter(s => s.status === 'complete').length;
  const atRiskCount = students.filter(s => s.status === 'at-risk').length;
  const avgProgress = students.length === 0 ? 0 : Math.round(
    students.reduce((sum, s) => {
      const modules = [s.spid, s.pec, s.emailMod, s.word, s.excel, s.portaliPa];
      return sum + modules.reduce((a, b) => a + b, 0) / modules.length;
    }, 0) / students.length
  );

  const handleExport = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const W = 297;
    const dateStr = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });

    // Background
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, W, 210, 'F');

    // Header bar
    doc.setFillColor(20, 20, 30);
    doc.rect(0, 0, W, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('DIGITAL BRIDGE — Report Coordinatore', 14, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 170);
    doc.text(`Generato il ${dateStr}`, W - 14, 14, { align: 'right' });

    // Stats row
    const stats = [
      { label: 'Totale', value: String(students.length), color: [59, 130, 246] as [number, number, number] },
      { label: 'Attivi', value: String(activeCount), color: [34, 197, 94] as [number, number, number] },
      { label: 'A rischio', value: String(atRiskCount), color: [245, 158, 11] as [number, number, number] },
      { label: 'Completato', value: String(completedCount), color: [139, 92, 246] as [number, number, number] },
      { label: 'Progresso medio', value: `${avgProgress}%`, color: [96, 165, 250] as [number, number, number] },
    ];
    stats.forEach((stat, i) => {
      const x = 14 + i * 56;
      doc.setFillColor(25, 25, 40);
      doc.roundedRect(x, 27, 52, 18, 3, 3, 'F');
      doc.setTextColor(...stat.color);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, x + 26, 38, { align: 'center' });
      doc.setTextColor(120, 120, 140);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label.toUpperCase(), x + 26, 43, { align: 'center' });
    });

    // Table
    autoTable(doc, {
      startY: 50,
      head: [['Nome', 'Email', 'SPID', 'PEC', 'Email', 'Word', 'Excel', 'PA', 'Status', 'Ultima attività']],
      body: students.map(s => [
        s.name,
        s.contactEmail,
        `${s.spid}%`,
        `${s.pec}%`,
        `${s.emailMod}%`,
        `${s.word}%`,
        `${s.excel}%`,
        `${s.portaliPa}%`,
        s.status,
        s.lastActivity,
      ]),
      styles: { fontSize: 8, cellPadding: 3, textColor: [220, 220, 230], fillColor: [18, 18, 28] },
      headStyles: { fillColor: [30, 30, 50], textColor: [150, 150, 200], fontStyle: 'bold', fontSize: 7 },
      alternateRowStyles: { fillColor: [22, 22, 35] },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 35 },
        1: { cellWidth: 45, textColor: [100, 150, 200] },
        8: { cellWidth: 20 },
        9: { cellWidth: 25, textColor: [100, 100, 120] },
      },
      didParseCell: (data) => {
        if (data.column.index >= 2 && data.column.index <= 7 && data.section === 'body') {
          const val = parseInt(String(data.cell.raw));
          if (val === 100) data.cell.styles.textColor = [34, 197, 94];
          else if (val > 50) data.cell.styles.textColor = [59, 130, 246];
          else if (val > 0) data.cell.styles.textColor = [245, 158, 11];
          else data.cell.styles.textColor = [80, 80, 100];
        }
      },
      margin: { left: 14, right: 14 },
    });

    // Footer
    doc.setTextColor(60, 60, 80);
    doc.setFontSize(7);
    doc.text('ImagoAI / MedsendX Italia S.r.l. · Progetto DIGITAL BRIDGE · Documento riservato', W / 2, 204, { align: 'center' });

    const fileName = `report-digital-bridge-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        className="w-full max-w-6xl bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-zinc-900/80">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-white">Pannello Coordinatore</h2>
              <p className="text-white/40 text-xs">DIGITAL BRIDGE — Gestione Beneficiari</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {loadingData && (
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Caricamento dati...
              </div>
            )}
            {!loadingData && (
              <button
                onClick={loadStudents}
                title="Aggiorna dati"
                className="p-2 text-white/40 hover:text-white bg-zinc-800 rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleExport}
              disabled={loadingData || students.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Esporta PDF
            </button>
            <button onClick={onClose} className="p-2 text-white/40 hover:text-white bg-zinc-800 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-0 border-b border-white/10">
          {[
            { label: 'Beneficiari totali', value: students.length, color: 'text-white', icon: Users },
            { label: 'Attivi questa settimana', value: activeCount, color: 'text-green-400', icon: TrendingUp },
            { label: 'A rischio abbandono', value: atRiskCount, color: 'text-orange-400', icon: AlertTriangle },
            { label: 'Progresso medio', value: `${avgProgress}%`, color: 'text-blue-400', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className={`px-6 py-4 ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {loadError && (
          <div className="mx-6 mt-4 flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-red-300 text-sm flex-1">{loadError}</p>
            <button onClick={loadStudents} className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-xs transition-colors">
              <RefreshCw className="w-3 h-3" /> Riprova
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-4 border-b border-white/10">
          {[
            { id: 'students', label: 'Studenti', count: students.length },
            { id: 'alerts', label: 'Alert Proattivi', count: alerts.length },
            { id: 'stats', label: 'Statistiche Moduli', count: null },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === tab.id
                  ? 'text-white border-blue-500'
                  : 'text-white/40 border-transparent hover:text-white/60'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-blue-500/20 text-blue-300' : 'bg-white/10 text-white/40'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Students table */}
          {activeTab === 'students' && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Cerca per nome o email..."
                    className="w-full pl-9 pr-4 py-2 bg-zinc-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div className="flex gap-1.5">
                  {(['all', 'active', 'at-risk', 'inactive', 'complete'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filter === f ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/60'
                      }`}
                    >
                      {f === 'all' ? 'Tutti' : f === 'active' ? 'Attivi' : f === 'at-risk' ? 'A rischio' : f === 'inactive' ? 'Inattivi' : 'Completati'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/60">
                      <th className="text-left px-4 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Beneficiario</th>
                      {moduleColumns.map(m => (
                        <th key={m.id} className="px-3 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">
                          <div className="flex items-center gap-1 justify-center">
                            <m.icon className="w-3 h-3" style={{ color: m.color }} />
                            {m.label}
                          </div>
                        </th>
                      ))}
                      <th className="text-left px-4 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Ultima attività</th>
                      <th className="text-left px-4 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((student, i) => (
                      <tr key={student.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? 'bg-zinc-900/20' : ''}`}>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-white font-medium">{student.name}</p>
                            <p className="text-white/30 text-xs">{student.contactEmail}</p>
                          </div>
                        </td>
                        {moduleColumns.map(m => (
                          <td key={m.id} className="px-3 py-3">
                            <ProgressCell pct={(student as any)[m.id]} />
                          </td>
                        ))}
                        <td className="px-4 py-3 text-white/40 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {student.lastActivity}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            student.status === 'active' ? 'bg-green-500/15 text-green-400' :
                            student.status === 'complete' ? 'bg-yellow-500/15 text-yellow-400' :
                            student.status === 'at-risk' ? 'bg-orange-500/15 text-orange-400' :
                            'bg-white/10 text-white/40'
                          }`}>
                            {student.status === 'active' ? 'Attivo' : student.status === 'complete' ? '🏅 Completato' : student.status === 'at-risk' ? '⚠️ A rischio' : 'Inattivo'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Alerts */}
          {activeTab === 'alerts' && (
            <div className="space-y-3">
              <p className="text-white/50 text-sm mb-4">Il sistema monitora automaticamente i segnali di abbandono e difficoltà.</p>
              {alerts.map(student => (
                <div key={student.id} className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{student.name}</p>
                    <p className="text-orange-300/70 text-xs">{student.alert}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg text-xs transition-colors">
                    Contatta
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {activeTab === 'stats' && (
            <div>
              <p className="text-white/50 text-sm mb-5">Tasso di completamento per modulo su {students.length} beneficiari.</p>
              <div className="space-y-4">
                {moduleColumns.map(m => {
                  const avg = students.length === 0 ? 0 : Math.round(students.reduce((sum, s) => sum + (s as any)[m.id], 0) / students.length);
                  const completed = students.filter(s => (s as any)[m.id] === 100).length;
                  return (
                    <div key={m.id} className="flex items-center gap-4 p-4 bg-zinc-900/60 border border-white/10 rounded-xl">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${m.color}25` }}>
                        <m.icon className="w-4 h-4" style={{ color: m.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white text-sm font-medium">{m.label}</span>
                          <span className="text-white/50 text-xs">{completed}/{students.length} completati</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${avg}%`, backgroundColor: m.color }} />
                        </div>
                      </div>
                      <div className="text-right shrink-0 w-12">
                        <p className="text-white font-bold">{avg}%</p>
                        <p className="text-white/30 text-xs">media</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Export toast */}
      <AnimatePresence>
        {showExportToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500/20 border border-green-500/40 backdrop-blur-md rounded-full text-green-300 text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Report PDF generato — pronto per la commissione
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
