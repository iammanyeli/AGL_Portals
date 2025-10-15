import React, { useState, useMemo, createContext, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { ThemeProvider, useTheme } from 'src/providers/ThemeProvider';
import { useTheme } from '../../../../../../providers/ThemeProvider';
import { Card, CardHeader, CardContent, CardTitle } from '../../../../../../components/primitives/Card';
import Button from '../../../../../../components/primitives/Button';
import TextField from '../../../../training/components/ui/TextField';
import SelectField from '../../../../training/components/ui/SelectField';

/* NEW COMPONENT / LOGIC */
// Inlined icons for the prototype
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IconEdit = () => (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
);
const IconTrash = () => (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
);
const IconLocation = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);
const IconEyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const IconEyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);


/* NEW COMPONENT / LOGIC */
const CertChip = ({ label, onRemove }) => (
    <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] mr-2 mb-2">
      <span>{label}</span>
      {onRemove && <button onClick={onRemove} className="text-[var(--color-text-secondary)]">×</button>}
    </div>
);
  
/* NEW COMPONENT / LOGIC */
const CertificatePicker = ({ all, selected = [], onChange }) => {
    const [query, setQuery] = useState('');
    const available = useMemo(() => all.filter(a => !selected.includes(a) && a.toLowerCase().includes(query.toLowerCase())), [all, selected, query]);
  
    const add = (cert) => onChange([...selected, cert]);
    const remove = (cert) => onChange(selected.filter(s => s !== cert));
  
    return (
      <div>
        <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-2">Certificates</label>
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search certificates..." className="flex-1 rounded-md border border-[var(--color-border)] px-3 py-2 bg-[var(--color-input-bg)] text-sm" />
            <div className="text-sm text-[var(--color-text-secondary)]">{selected.length} selected</div>
          </div>
        </div>
  
        <div className="mb-3">
          <div className="flex flex-wrap">
            {selected.map(s => <CertChip key={s} label={s} onRemove={() => remove(s)} />)}
            {selected.length === 0 && <div className="text-xs text-[var(--color-text-secondary)]">No certificates chosen</div>}
          </div>
        </div>
  
        <div className="max-h-36 overflow-auto border border-[var(--color-border)] rounded-md p-2 bg-[var(--color-surface)]">
          {available.length === 0 ? (
            <div className="text-xs text-[var(--color-text-secondary)] p-3">No matches</div>
          ) : (
            available.map(a => (
              <button key={a} onClick={() => add(a)} type="button" className="w-full text-left text-sm py-2 px-3 rounded-md hover:bg-[var(--color-surface-hover)]">{a}</button>
            ))
          )}
        </div>
      </div>
    );
};
  
/* NEW COMPONENT / LOGIC */
const SlideForm = ({ open, onClose, onSubmit, initial = {}, provinces = [], certificates = [] }) => {
    const [form, setForm] = useState({ abbreviatedName: '', fullName: '', province: '', certificates: [] });
  
    // useEffect(() => setForm({ abbreviatedName: initial.abbreviatedName || '', fullName: initial.fullName || '', province: initial.province || '', certificates: initial.certificates || [] }), [initial, open]);
    useEffect(() => {
        if (!open) return;
        setForm({
            abbreviatedName: initial?.abbreviatedName || '',
            fullName: initial?.fullName || '',
            province: initial?.province || '',
            certificates: initial?.certificates || []
        });
        }, [
        open,
        initial?.abbreviatedName,
        initial?.fullName,
        initial?.province,
        JSON.stringify(initial?.certificates || [])
        ]);

    const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const changeCerts = (c) => setForm(f => ({ ...f, certificates: c }));
  
    const submit = (e) => { e.preventDefault(); onSubmit(form); };
  
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={onClose}
              className="fixed inset-0 bg-black/30 z-40"
            />
            <motion.aside 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-[var(--color-surface-alt)] shadow-2xl"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-divider)]">
                  <div>
                    <h4 className="text-lg font-bold">{initial.abbreviatedName ? 'Edit Site' : 'Add Site'}</h4>
                    <div className="text-xs text-[var(--color-text-secondary)]">Quickly add or edit a training site</div>
                  </div>
                  <Button variant="ghost" onClick={onClose}>Close</Button>
                </div>
  
                <form onSubmit={submit} className="p-4 overflow-auto flex-1 bg-[var(--color-surface)]">
                  <TextField label="Abbreviated Name" name="abbreviatedName" value={form.abbreviatedName} onChange={change} required placeholder="e.g., JHB-1" disabled={!!initial.abbreviatedName} />
                  <TextField label="Full Name" name="fullName" value={form.fullName} onChange={change} required placeholder="e.g., Johannesburg Central" />
                  <SelectField label="Province" name="province" value={form.province} onChange={change} options={provinces} required />
  
                  <div className="mt-2">
                    <CertificatePicker all={certificates} selected={form.certificates} onChange={changeCerts} />
                  </div>
                </form>
  
                <div className="p-4 border-t border-[var(--color-divider)] bg-[var(--color-surface-alt)]">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
                    <Button onClick={submit} variant="info">Save Site</Button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
};
  
/* NEW COMPONENT / LOGIC */
const StatPill = ({ label, target = 0 }) => {
    const countRef = useRef(null);

    useEffect(() => {
        const element = countRef.current;
        if (!element) return;

        let frame = 0;
        const targetValue = target;
        const animationDuration = 1000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(animationDuration / frameDuration);
        let animationFrameId;

        const startValue = parseInt(element.textContent || '0', 10);

        const animateCountUp = () => {
            frame++;
            const progress = frame / totalFrames;
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const currentDisplayValue = Math.round(startValue + (targetValue - startValue) * easedProgress);

            element.textContent = currentDisplayValue;

            if (frame < totalFrames) {
                animationFrameId = requestAnimationFrame(animateCountUp);
            } else {
                element.textContent = targetValue;
            }
        };
        
        animationFrameId = requestAnimationFrame(animateCountUp);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [target]);

    return (
        <div className="flex flex-row items-center justify-center p-0.5 bg-[var(--color-button-primary-bg)] rounded-full shadow-sm h-6">
            <div
                className="flex-grow h-full bg-[var(--color-surface)] rounded-l-full flex items-center justify-center px-2"
                aria-label={label}
            >
                <span className="font-semibold text-xs text-[var(--color-text-secondary)] uppercase tracking-wider truncate">{label}</span>
            </div>
            
            <div className="w-10 h-full bg-[var(--color-button-primary-bg)] rounded-r-full flex items-center justify-center">
                <span ref={countRef} className="font-bold text-sm text-[var(--color-button-primary-text)]">0</span>
            </div>
        </div>
    );
};


/* NEW COMPONENT / LOGIC */
const SiteCard = ({ site, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const certificates = site.certificates || [];

    return (
        <motion.div layout="position">
            <Card className="hover:border-[var(--color-info)] transition-colors group flex flex-col overflow-hidden w-full">
                {/* Custom Header */}
                <div className="p-4 bg-[var(--color-surface-subtle)] border-b border-[var(--color-divider)]">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1.5">
                            <h4 className="font-bold text-base text-[var(--color-text-primary)]">{site.fullName}</h4>
                            <div className="font-mono bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] px-2 py-1 rounded text-xs inline-block self-start">{site.abbreviatedName}</div>
                            <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]"><IconLocation /><span>{site.province}</span></div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
                            <button onClick={() => onEdit(site)} title="Edit" className="h-10 w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors">
                                <IconEdit />
                            </button>
                            <button onClick={() => onDelete(site)} title="Delete" className="h-10 w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-destructive)] rounded-full transition-colors">
                                <IconTrash />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex-grow">
                                <StatPill 
                                    label="Certificates" 
                                    target={certificates.length}
                                />
                            </div>
                            <button onClick={() => setIsExpanded(!isExpanded)} className="w-8 h-6 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors" title={isExpanded ? "Show less" : "Show more"}>
                                {isExpanded ? <IconEyeClosed /> : <IconEyeOpen />}
                            </button>
                        </div>

                        <div className={`flex gap-1 items-center ${isExpanded ? 'flex-wrap' : 'flex-nowrap overflow-hidden'}`}>
                            {certificates.length > 0 ? (
                                certificates.map(c => <span key={c} className="text-xs px-2 py-1 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)] whitespace-nowrap">{c}</span>)
                            ) : (
                                <span className="text-xs italic text-[var(--color-text-secondary)]">No certificates assigned</span>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};



/* NEW COMPONENT / LOGIC */
const SiteManager = ({ sites: incomingSites = [], provinces = [], certificates = [], onAddSite, onUpdateSite, onDeleteSite }) => {
    const [sites, setSites] = useState(incomingSites);
    const [query, setQuery] = useState('');
    const [filterProvince, setFilterProvince] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const { toggleTheme } = useTheme();
  
    useEffect(() => setSites(incomingSites), [incomingSites]);
  
    const filtered = useMemo(() => {
      return sites.filter(s => (
        (!query || s.fullName.toLowerCase().includes(query.toLowerCase()) || s.abbreviatedName.toLowerCase().includes(query.toLowerCase())) &&
        (!filterProvince || s.province === filterProvince)
      ));
    }, [sites, query, filterProvince]);
  
    const openAdd = () => { setEditing(null); setDrawerOpen(true); };
    const openEdit = (site) => { setEditing(site); setDrawerOpen(true); };
  
    const handleSubmit = (site) => {
      if (!site || !site.abbreviatedName) return;
      const isEditing = !!editing;
  
      if (isEditing) {
        const updated = sites.map(s => s.abbreviatedName === site.abbreviatedName ? site : s);
        setSites(updated);
        onUpdateSite && onUpdateSite(site.abbreviatedName, site);
      } else {
          const exists = sites.some(s => s.abbreviatedName.toLowerCase() === site.abbreviatedName.toLowerCase());
          if (exists) {
            // Using a custom modal/toast is better in real apps, but alert is fine for this prototype.
            // In a real app, I'd replace this with a non-blocking notification.
            console.error(`A site with abbreviation "${site.abbreviatedName}" already exists.`);
            return;
          }
        setSites(prev => [site, ...prev].sort((a,b) => a.fullName.localeCompare(b.fullName)));
        onAddSite && onAddSite(site);
      }
      setDrawerOpen(false);
    };
  
    const handleDelete = (site) => {
      // Using a custom modal/toast is better in real apps, but confirm is fine for this prototype.
      // In a real app, I'd replace this with a confirmation modal.
      console.warn(`Attempting to delete site "${site.fullName}". Awaiting confirmation.`);
      setSites(prev => prev.filter(s => s.abbreviatedName !== site.abbreviatedName));
      onDeleteSite && onDeleteSite(site.abbreviatedName);
    };
  
    return (
      <div className="max-w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
            <div className="flex items-end gap-3 flex-wrap">
            <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-lg px-3 py-1 bg-[var(--color-surface)]">
                <IconSearch />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sites..." className="outline-none text-sm bg-transparent w-32" />
            </div>

            <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]">
                <option value="">All Provinces</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            
            <Button variant="ghost" onClick={toggleTheme} className="hidden sm:inline-flex">Toggle Theme</Button>
            
            <Button variant="primary" onClick={openAdd} className="flex items-center gap-2"><IconPlus /> Add Site</Button>
            </div>
        </div>
  
        {/* Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
            {filtered.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent>
                    <div className="p-10 text-center text-[var(--color-text-secondary)]">
                      <p className="font-semibold">No sites found</p>
                      <p className="text-sm">Try removing filters or add a new site.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filtered.map(s => <SiteCard key={s.abbreviatedName} site={s} onEdit={openEdit} onDelete={handleDelete} />)
            )}
          </div>
        </AnimatePresence>
  
        {/* Drawer Form */}
        <SlideForm open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={handleSubmit} initial={editing || {}} provinces={provinces} certificates={certificates} />
      </div>
    );
  };

  export default SiteManager;