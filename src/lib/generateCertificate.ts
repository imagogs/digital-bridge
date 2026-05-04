import jsPDF from 'jspdf';

interface CertificateParams {
  userName: string;
  moduleName: string;
  moduleCode: string;
  score: number;
  date: Date;
}

export function generateCertificatePDF({
  userName,
  moduleName,
  moduleCode,
  score,
  date,
}: CertificateParams): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297; // A4 landscape width
  const H = 210; // A4 landscape height

  // ── Background ──────────────────────────────────────────────────────────────
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, W, H, 'F');

  // ── Outer border ────────────────────────────────────────────────────────────
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.3);
  doc.setGState(doc.GState({ opacity: 0.15 }));
  doc.rect(8, 8, W - 16, H - 16);
  doc.rect(10, 10, W - 20, H - 20);

  // ── Inner accent line (blue) ─────────────────────────────────────────────
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.8);
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.line(14, 14, W - 14, 14);
  doc.line(14, H - 14, W - 14, H - 14);

  // ── Header ───────────────────────────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('DIGITAL BRIDGE · ImagoAI / MedsendX Italia S.r.l.', W / 2, 22, { align: 'center' });

  // ── Main title ───────────────────────────────────────────────────────────────
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const titleText = 'CERTIFICATO DI COMPETENZA DIGITALE';
  const spacing = 3;
  let xPos = W / 2 - (doc.getStringUnitWidth(titleText) * 11 / doc.internal.scaleFactor + spacing * (titleText.length - 1)) / 2;
  doc.text(titleText, W / 2, 38, { align: 'center', charSpace: spacing });

  // ── Decorative line under title ─────────────────────────────────────────────
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - 50, 43, W / 2 + 50, 43);

  // ── "Conferito a" label ────────────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.5 }));
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('conferito a', W / 2, 58, { align: 'center' });

  // ── User name ────────────────────────────────────────────────────────────────
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(34);
  doc.setFont('times', 'bold');
  doc.text(userName, W / 2, 78, { align: 'center' });

  // ── "per aver completato" label ─────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.5 }));
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('per aver completato con successo il modulo', W / 2, 96, { align: 'center' });

  // ── Module name ───────────────────────────────────────────────────────────────
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(20);
  doc.setFont('times', 'bold');
  doc.text(`${moduleCode} — ${moduleName}`, W / 2, 112, { align: 'center' });

  // ── Score + date row ─────────────────────────────────────────────────────────
  const dateStr = date.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });

  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.6 }));
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Punteggio: ${score}%`, W / 2 - 35, 128, { align: 'center' });
  doc.text(`Data: ${dateStr}`, W / 2 + 35, 128, { align: 'center' });

  // ── Separator ──────────────────────────────────────────────────────────────
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.2);
  doc.setGState(doc.GState({ opacity: 0.1 }));
  doc.line(50, 138, W - 50, 138);

  // ── Footer ────────────────────────────────────────────────────────────────────
  doc.setGState(doc.GState({ opacity: 0.3 }));
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('ImagoAI / MedsendX Italia S.r.l. · Progetto DIGITAL BRIDGE · digitalbridge.it', W / 2, 148, { align: 'center' });
  doc.text('Il presente certificato attesta il completamento del percorso formativo relativo al modulo indicato.', W / 2, 155, { align: 'center' });

  // ── "Firma" placeholder ────────────────────────────────────────────────────
  doc.setGState(doc.GState({ opacity: 0.2 }));
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.3);
  doc.line(W - 80, 172, W - 20, 172);
  doc.setFontSize(8);
  doc.text('Responsabile del Progetto', W - 50, 178, { align: 'center' });

  // ── Page corner decorations ──────────────────────────────────────────────
  doc.setGState(doc.GState({ opacity: 0.15 }));
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(1);
  // TL
  doc.line(14, 14, 26, 14); doc.line(14, 14, 14, 26);
  // TR
  doc.line(W - 26, 14, W - 14, 14); doc.line(W - 14, 14, W - 14, 26);
  // BL
  doc.line(14, H - 26, 14, H - 14); doc.line(14, H - 14, 26, H - 14);
  // BR
  doc.line(W - 26, H - 14, W - 14, H - 14); doc.line(W - 14, H - 26, W - 14, H - 14);

  // ── Save ─────────────────────────────────────────────────────────────────────
  const fileName = `certificato-digital-bridge-${moduleCode.toLowerCase()}.pdf`;
  doc.save(fileName);
}
