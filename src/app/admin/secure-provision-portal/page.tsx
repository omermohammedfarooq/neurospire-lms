"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopAppBar from "@/components/layout/TopAppBar";
import Footer from "@/components/layout/Footer";
import {
  getWeeks,
  saveWeek,
  deleteWeek,
  getModules,
  saveModule,
  deleteModule,
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  getSubmissions,
  clearSubmission,
  Announcement,
  StudentSubmission
} from "@/services/lmsService";
import { WeekData, ModuleData } from "@/data/courseData";

interface StudentAccount {
  id: string;
  name: string;
  email: string;
  track: string;
  tier: "Lite" | "Regular" | "Pro";
  registeredAt: string;
  password?: string;
}

interface PartnerAccount {
  id: string;
  name: string;
  email: string;
  track: string;
  company: string;
  password?: string;
  registeredAt: string;
}

export default function SecureProvisionPortalPage() {
  const [activeTab, setActiveTab] = useState<"students" | "partners" | "lms">("students");

  // Dynamic database states
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Student Form State
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("student123");
  const [studentTrack, setStudentTrack] = useState("ai-ml");
  const [studentTier, setStudentTier] = useState<"Lite" | "Regular" | "Pro">("Regular");
  const [studentAccounts, setStudentAccounts] = useState<StudentAccount[]>([]);

  // Partner Form State
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [partnerPassword, setPartnerPassword] = useState("partnerpass");
  const [partnerTrack, setPartnerTrack] = useState("institutional");
  const [partnerAccounts, setPartnerAccounts] = useState<PartnerAccount[]>([]);

  // LMS Week Creator State
  const [newWeekId, setNewWeekId] = useState("");
  const [newWeekNum, setNewWeekNum] = useState<number>(5);
  const [newWeekTitle, setNewWeekTitle] = useState("");
  const [newWeekSubtitle, setNewWeekSubtitle] = useState("");
  const [newWeekDesc, setNewWeekDesc] = useState("");

  // LMS Module Editor State
  const [selectedWeekId, setSelectedWeekId] = useState("");
  const [moduleEditingId, setModuleEditingId] = useState(""); // empty = new, otherwise select ID
  const [modTitle, setModTitle] = useState("");
  const [modDuration, setModDuration] = useState("");
  const [modVideo, setModVideo] = useState("");
  const [modNotes, setModNotes] = useState("");
  
  // Resource inputs
  const [resName, setResName] = useState("");
  const [resUrl, setResUrl] = useState("");
  const [resType, setResType] = useState<"pdf" | "link" | "zip">("pdf");
  const [tempResources, setTempResources] = useState<Array<{ name: string; url: string; type: "pdf" | "link" | "zip" }>>([]);

  // Assignment inputs
  const [assignTitle, setAssignTitle] = useState("");
  const [assignDesc, setAssignDesc] = useState("");
  const [assignDeliverable, setAssignDeliverable] = useState("");

  // Announcements inputs
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annTier, setAnnTier] = useState("All");

  // Load registered accounts and database structures from localStorage/service
  const loadDatabase = () => {
    setWeeks(getWeeks());
    setAnnouncements(getAnnouncements());
    setSubmissions(getSubmissions());
  };

  useEffect(() => {
    loadDatabase();

    // 1. Load Students
    const savedStudents = localStorage.getItem("neurospire_provisioned_students");
    if (savedStudents) {
      try {
        setStudentAccounts(JSON.parse(savedStudents));
      } catch (e) {
        console.error("Failed to parse provisioned students", e);
      }
    } else {
      const defaultStudents: StudentAccount[] = [
        {
          id: "STU-9801",
          name: "Amit Sharma",
          email: "amit.sharma@example.com",
          track: "AI / Machine Learning",
          tier: "Regular",
          registeredAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
          password: "student123",
        },
        {
          id: "STU-7762",
          name: "Sneha Patel",
          email: "sneha.patel@example.com",
          track: "Prompt Engineering",
          tier: "Lite",
          registeredAt: new Date(Date.now() - 86400000).toLocaleDateString(),
          password: "student123",
        },
      ];
      setStudentAccounts(defaultStudents);
      localStorage.setItem("neurospire_provisioned_students", JSON.stringify(defaultStudents));
    }

    // 2. Load Partners
    const savedPartners = localStorage.getItem("neurospire_provisioned_partners");
    if (savedPartners) {
      try {
        setPartnerAccounts(JSON.parse(savedPartners));
      } catch (e) {
        console.error("Failed to parse provisioned partners", e);
      }
    } else {
      const defaultPartners: PartnerAccount[] = [
        {
          id: "PARTNER-100",
          name: "Neurospire Enterprise Partner Hub",
          company: "Neurospire AI Technologies",
          email: "partner@neurospire.ai",
          track: "Institutional Integration",
          password: "partnerpass",
          registeredAt: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
        },
      ];
      setPartnerAccounts(defaultPartners);
      localStorage.setItem("neurospire_provisioned_partners", JSON.stringify(defaultPartners));
    }
  }, []);

  // Handlers
  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !studentPassword) return;

    const emailExists = studentAccounts.some(
      (acc) => acc.email.toLowerCase().trim() === studentEmail.toLowerCase().trim()
    );

    if (emailExists) {
      setErrorMessage(`Error: A student account with the email "${studentEmail}" already exists!`);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    setErrorMessage("");

    const newStudent: StudentAccount = {
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: studentName,
      email: studentEmail,
      track:
        studentTrack === "ai-ml"
          ? "AI / Machine Learning"
          : studentTrack === "web-dev"
          ? "Web Development"
          : studentTrack === "data-science"
          ? "Data Science"
          : studentTrack === "python"
          ? "Python Development"
          : "Prompt Engineering",
      tier: studentTier,
      registeredAt: new Date().toLocaleDateString(),
      password: studentPassword,
    };

    const updated = [newStudent, ...studentAccounts];
    setStudentAccounts(updated);
    localStorage.setItem("neurospire_provisioned_students", JSON.stringify(updated));

    setStudentName("");
    setStudentEmail("");
    setStudentPassword("student123");
    setSuccessMessage(`Student account for ${studentName} successfully provisioned!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleRegisterPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerEmail || !partnerId || !partnerPassword) return;

    const newPartner: PartnerAccount = {
      id: partnerId.toUpperCase().trim(),
      name: partnerName,
      company: partnerName,
      email: partnerEmail,
      track:
        partnerTrack === "institutional"
          ? "Institutional Integration"
          : partnerTrack === "research"
          ? "Research Collaboration"
          : "Hiring Cohort",
      password: partnerPassword,
      registeredAt: new Date().toLocaleDateString(),
    };

    const updated = [newPartner, ...partnerAccounts];
    setPartnerAccounts(updated);
    localStorage.setItem("neurospire_provisioned_partners", JSON.stringify(updated));

    setPartnerName("");
    setPartnerEmail("");
    setPartnerId("");
    setPartnerPassword("partnerpass");
    setSuccessMessage(`Enterprise Partner Hub "${partnerName}" successfully provisioned!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // LMS CRUD Operations
  const handleAddWeek = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeekId || !newWeekTitle) return;

    saveWeek({
      id: newWeekId.toLowerCase().trim(),
      weekNumber: newWeekNum,
      title: newWeekTitle,
      subtitle: newWeekSubtitle,
      description: newWeekDesc
    });

    setNewWeekId("");
    setNewWeekNum(weeks.length + 2);
    setNewWeekTitle("");
    setNewWeekSubtitle("");
    setNewWeekDesc("");

    loadDatabase();
    setSuccessMessage(`LMS week "${newWeekTitle}" added successfully!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleAddResource = () => {
    if (!resName || !resUrl) return;
    setTempResources([...tempResources, { name: resName, url: resUrl, type: resType }]);
    setResName("");
    setResUrl("");
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWeekId || !modTitle) return;

    const targetModuleId = moduleEditingId || `mod-${Math.floor(10000 + Math.random() * 90000)}`;

    saveModule({
      id: targetModuleId,
      weekId: selectedWeekId,
      title: modTitle,
      duration: modDuration || "45 mins",
      videoUrl: modVideo || "https://www.w3schools.com/html/mov_bbb.mp4",
      notes: modNotes,
      resources: tempResources,
      assignment: {
        title: assignTitle || "Module Project Deliverable",
        description: assignDesc || "Build out the code requirements specified in notes.",
        deliverable: assignDeliverable || "Submit public repository link."
      }
    });

    // Reset module form
    setModuleEditingId("");
    setModTitle("");
    setModDuration("");
    setModVideo("");
    setModNotes("");
    setTempResources([]);
    setAssignTitle("");
    setAssignDesc("");
    setAssignDeliverable("");

    loadDatabase();
    setSuccessMessage(`LMS Module "${modTitle}" saved successfully!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleEditModuleClick = (m: ModuleData & { weekId: string }) => {
    setSelectedWeekId(m.weekId);
    setModuleEditingId(m.id);
    setModTitle(m.title);
    setModDuration(m.duration);
    setModVideo(m.videoUrl);
    setModNotes(m.notes);
    setTempResources(m.resources);
    setAssignTitle(m.assignment.title);
    setAssignDesc(m.assignment.description);
    setAssignDeliverable(m.assignment.deliverable);
  };

  const handleDeleteModuleClick = (id: string) => {
    deleteModule(id);
    loadDatabase();
    setSuccessMessage("LMS module deleted successfully.");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleDeleteWeekClick = (id: string) => {
    deleteWeek(id);
    loadDatabase();
    setSuccessMessage("LMS week and child modules removed.");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // Announcements Operations
  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;
    addAnnouncement(annTitle, annContent, annTier);
    setAnnTitle("");
    setAnnContent("");
    loadDatabase();
    setSuccessMessage("Global announcement broadcasted successfully!");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleDeleteAnnouncement = (id: string) => {
    deleteAnnouncement(id);
    loadDatabase();
  };

  const handleDeleteSubmission = (id: string) => {
    clearSubmission(id);
    loadDatabase();
  };

  const deleteStudent = (id: string) => {
    const updated = studentAccounts.filter((acc) => acc.id !== id);
    setStudentAccounts(updated);
    localStorage.setItem("neurospire_provisioned_students", JSON.stringify(updated));
  };

  const updateStudentTier = (id: string, newTier: "Lite" | "Regular" | "Pro") => {
    const updated = studentAccounts.map((acc) => {
      if (acc.id === id) {
        return { ...acc, tier: newTier };
      }
      return acc;
    });
    setStudentAccounts(updated);
    localStorage.setItem("neurospire_provisioned_students", JSON.stringify(updated));
    setSuccessMessage(`Access tier successfully updated to ${newTier}!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const deletePartner = (id: string) => {
    const updated = partnerAccounts.filter((acc) => acc.id !== id);
    setPartnerAccounts(updated);
    localStorage.setItem("neurospire_provisioned_partners", JSON.stringify(updated));
  };

  return (
    <>
      <TopAppBar />
      <main className="min-h-screen flex flex-col bg-background text-on-surface antialiased pt-[90px] pb-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 md:px-12">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-4">
              <span className="material-symbols-outlined text-[16px] text-primary">admin_panel_settings</span>
              <span className="text-label-caps text-primary font-display font-bold">Secure Administrative Command Console</span>
            </div>
            <h1 className="text-headline-lg md:text-display-lg text-on-surface mb-3 tracking-tight font-bold font-display">
              Enterprise Control Center
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Dynamic manual provisioning, database content edits, custom unlisted YouTube updates, and submissions audits.
            </p>
          </div>

          {/* Alert Success */}
          {successMessage && (
            <div className="max-w-[1200px] mx-auto mb-6 p-4 bg-success/10 border border-success/30 text-success rounded-xl flex items-center gap-3 text-body-sm animate-scale-in">
              <span className="material-symbols-outlined">check_circle</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Alert Error */}
          {errorMessage && (
            <div className="max-w-[1200px] mx-auto mb-6 p-4 bg-error/10 border border-error/30 text-error rounded-xl flex items-start gap-3 text-body-sm animate-scale-in">
              <span className="material-symbols-outlined shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Main 3-Tab Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-[1200px] mx-auto">
            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-label-caps font-bold transition-all border ${
                activeTab === "students"
                  ? "bg-primary border-primary text-on-primary shadow-lg"
                  : "bg-surface-container-low/20 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
              Student Registry
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-label-caps font-bold transition-all border ${
                activeTab === "partners"
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-lg"
                  : "bg-surface-container-low/20 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
              Partner Sponsor Registry
            </button>
            <button
              onClick={() => setActiveTab("lms")}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-label-caps font-bold transition-all border ${
                activeTab === "lms"
                  ? "bg-amber-600 border-amber-600 text-white shadow-lg"
                  : "bg-surface-container-low/20 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              LMS Course & Content Editor
            </button>
          </div>

          {/* TAB 1: Student Registry */}
          {activeTab === "students" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1200px] mx-auto items-start">
              <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl">
                <h2 className="text-title-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person_add</span>
                  Provision Student
                </h2>
                <form onSubmit={handleRegisterStudent} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="stu-name">Student Full Name</label>
                    <input
                      id="stu-name"
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="E.g. Amit Sharma"
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary outline-none text-body-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="stu-email">Student Email Address</label>
                    <input
                      id="stu-email"
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="E.g. amit@example.com"
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary outline-none text-body-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]">Security Password</label>
                    <input
                      type="text"
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-body-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]">Course Technical Track</label>
                    <select
                      value={studentTrack}
                      onChange={(e) => setStudentTrack(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary outline-none text-body-sm"
                    >
                      <option value="ai-ml">AI / Machine Learning</option>
                      <option value="web-dev">Web Development</option>
                      <option value="data-science">Data Science</option>
                      <option value="python">Python Development</option>
                      <option value="prompt-eng">Prompt Engineering</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]">LMS Access Tier</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Lite", "Regular", "Pro"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setStudentTier(t as any)}
                          className={`py-2 rounded-lg text-label-caps border font-bold transition-all ${
                            studentTier === t
                              ? "bg-primary border-primary text-on-primary"
                              : "bg-surface-container-low/20 border-outline-variant/30 text-on-surface-variant"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-primary hover:bg-primary-fixed text-on-primary text-label-caps py-3.5 rounded-lg font-bold tracking-widest mt-2 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    PROVISION STUDENT
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">groups</span>
                    Student Registry Directory
                  </h2>
                  <span className="text-body-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-bold">{studentAccounts.length} Enrolled</span>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
                  {studentAccounts.map((acc) => (
                    <div key={acc.id} className="glass-panel p-4 rounded-lg border border-outline-variant/10 flex flex-col gap-3 card-hover">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-body-lg font-bold text-on-surface">{acc.name}</span>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                              acc.tier === "Pro"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : acc.tier === "Regular"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}>{acc.tier}</span>
                          </div>
                          <span className="text-body-sm text-on-surface-variant font-mono">{acc.email}</span>
                          <span className="text-[12px] text-outline flex items-center gap-1.5 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">psychology</span>
                            {acc.track} • Registered {acc.registeredAt} • Password: <span className="font-mono text-primary font-bold">{acc.password || "student123"}</span>
                          </span>
                        </div>
                        <button onClick={() => deleteStudent(acc.id)} className="text-on-surface-variant hover:text-error p-2 hover:bg-surface-container rounded-lg transition-colors shrink-0"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                      </div>

                      {/* Tier Upgrade Controls */}
                      <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/10">
                        <span className="text-[10px] text-outline font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">upgrade</span>
                          Tier:
                        </span>
                        {(["Lite", "Regular", "Pro"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => updateStudentTier(acc.id, t)}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border ${
                              acc.tier === t
                                ? t === "Pro"
                                  ? "bg-amber-500 border-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.25)]"
                                  : t === "Regular"
                                  ? "bg-primary border-primary text-on-primary shadow-[0_0_10px_rgba(68,143,255,0.2)]"
                                  : "bg-emerald-600 border-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                : "bg-transparent border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Partner Sponsor Registry */}
          {activeTab === "partners" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1200px] mx-auto items-start">
              <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-xl border border-emerald-500/10 shadow-2xl">
                <h2 className="text-title-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">domain_add</span>
                  Provision Partner Hub
                </h2>
                <form onSubmit={handleRegisterPartner} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-[#94A3B8] uppercase tracking-wider text-[11px]" htmlFor="part-cname">Institution / Corporate Name</label>
                    <input
                      id="part-cname"
                      type="text"
                      required
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="E.g. InCoinPay Global"
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-emerald-500 outline-none text-body-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-[#94A3B8] uppercase tracking-wider text-[11px]" htmlFor="part-cemail">Contact Admin Email</label>
                    <input
                      id="part-cemail"
                      type="email"
                      required
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="E.g. integrations@incoinpay.com"
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-emerald-500 outline-none text-body-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-label-caps text-[#94A3B8] uppercase tracking-wider text-[11px]" htmlFor="part-cid">Corporate ID</label>
                      <input
                        id="part-cid"
                        type="text"
                        required
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        placeholder="PARTNER-101"
                        className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-emerald-500 outline-none text-body-sm font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-label-caps text-[#94A3B8] uppercase tracking-wider text-[11px]" htmlFor="part-cpass">Password</label>
                      <input
                        id="part-cpass"
                        type="text"
                        required
                        value={partnerPassword}
                        onChange={(e) => setPartnerPassword(e.target.value)}
                        placeholder="partnerpass"
                        className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-emerald-500 outline-none text-body-sm font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-caps text-[#94A3B8] uppercase tracking-wider text-[11px]">Integration Strategy Track</label>
                    <select
                      value={partnerTrack}
                      onChange={(e) => setPartnerTrack(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-emerald-500 outline-none text-body-sm"
                    >
                      <option value="institutional">Institutional Integration</option>
                      <option value="research">Research Collaboration</option>
                      <option value="hiring">Hiring Cohort Placement</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-label-caps py-3.5 rounded-lg font-bold tracking-widest mt-2 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    PROVISION PARTNER HUB
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400">shield_with_house</span>
                    Partner Sponsor Directory
                  </h2>
                  <span className="text-body-sm text-[#94A3B8] bg-surface-container px-3 py-1 rounded-full font-bold">{partnerAccounts.length} Sponsors</span>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
                  {partnerAccounts.map((acc) => (
                    <div key={acc.id} className="glass-panel p-4 rounded-lg border border-emerald-500/10 flex items-center justify-between gap-4 card-hover animate-fade-in">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-body-lg font-bold text-[#F1F5F9]">{acc.name}</span>
                          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">ID: {acc.id}</span>
                        </div>
                        <span className="text-body-sm text-[#94A3B8] font-mono">{acc.email}</span>
                        <span className="text-[12px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">corporate_fare</span>
                          {acc.track} • Password: <span className="font-mono text-emerald-300 font-bold">{acc.password}</span>
                        </span>
                      </div>
                      <button onClick={() => deletePartner(acc.id)} className="text-[#64748B] hover:text-red-400 p-2 hover:bg-slate-800 rounded-lg transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LMS Course & Content Editor */}
          {activeTab === "lms" && (
            <div className="flex flex-col gap-10 max-w-[1200px] mx-auto">
              
              {/* Row 1: Week Manager & Module Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1.1 Add/Edit Week Card */}
                <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-xl border border-amber-500/10 shadow-2xl flex flex-col gap-5">
                  <h3 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">add_moderator</span>
                    Add Course Week
                  </h3>
                  <form onSubmit={handleAddWeek} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-outline font-bold uppercase" htmlFor="wk-id">Unique Week ID</label>
                        <input
                          id="wk-id"
                          type="text"
                          required
                          placeholder="e.g. week-5"
                          value={newWeekId}
                          onChange={(e) => setNewWeekId(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-outline font-bold uppercase">Week Number</label>
                        <input
                          type="number"
                          required
                          value={newWeekNum}
                          onChange={(e) => setNewWeekNum(parseInt(e.target.value) || 1)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-outline font-bold uppercase" htmlFor="wk-title">Week Title</label>
                      <input
                        id="wk-title"
                        type="text"
                        required
                        placeholder="e.g. Advanced AI Agents"
                        value={newWeekTitle}
                        onChange={(e) => setNewWeekTitle(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-outline font-bold uppercase" htmlFor="wk-subtitle">Week Subtitle</label>
                      <input
                        id="wk-subtitle"
                        type="text"
                        placeholder="Short, visual summary of objectives"
                        value={newWeekSubtitle}
                        onChange={(e) => setNewWeekSubtitle(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-outline font-bold uppercase" htmlFor="wk-desc">Detailed Syllabus Description</label>
                      <textarea
                        id="wk-desc"
                        rows={3}
                        placeholder="Detail week core technical focuses..."
                        value={newWeekDesc}
                        onChange={(e) => setNewWeekDesc(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm"
                      />
                    </div>

                    <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white text-label-caps py-3 rounded-lg font-bold tracking-widest transition-all">
                      ADD WEEK TO SYLLABUS
                    </button>
                  </form>
                </div>

                {/* 1.2 Module Editor Card */}
                <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-xl border border-amber-500/10 shadow-2xl flex flex-col gap-5">
                  <h3 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">edit_note</span>
                    {moduleEditingId ? `Edit Module: ${modTitle}` : "Create/Add Learning Module"}
                  </h3>
                  
                  <form onSubmit={handleSaveModule} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-outline font-bold uppercase">Target Week</label>
                        <select
                          required
                          value={selectedWeekId}
                          onChange={(e) => setSelectedWeekId(e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2.5 text-body-sm outline-none"
                        >
                          <option value="">-- Select Target Week --</option>
                          {weeks.map((w) => (
                            <option key={w.id} value={w.id}>Week {w.weekNumber}: {w.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-outline font-bold uppercase" htmlFor="mod-title">Module Title</label>
                        <input
                          id="mod-title"
                          type="text"
                          required
                          placeholder="e.g. Setting Up Supabase Databases"
                          value={modTitle}
                          onChange={(e) => setModTitle(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-outline font-bold uppercase" htmlFor="mod-dur">Estimated Duration</label>
                          <input
                            id="mod-dur"
                            type="text"
                            placeholder="e.g. 45 mins"
                            value={modDuration}
                            onChange={(e) => setModDuration(e.target.value)}
                            className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-outline font-bold uppercase">Action</label>
                          {moduleEditingId && (
                            <button
                              type="button"
                              onClick={() => {
                                setModuleEditingId("");
                                setModTitle("");
                                setModDuration("");
                                setModVideo("");
                                setModNotes("");
                                setTempResources([]);
                                setAssignTitle("");
                                setAssignDesc("");
                                setAssignDeliverable("");
                              }}
                              className="w-full border border-outline-variant/30 hover:border-red-400 text-red-400 py-2.5 rounded-lg text-[10px] font-bold tracking-wider"
                            >
                              CANCEL EDIT
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-outline font-bold uppercase" htmlFor="mod-vid">
                          Video Embed / Source URL (Supports YouTube!)
                        </label>
                        <input
                          id="mod-vid"
                          type="text"
                          placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                          value={modVideo}
                          onChange={(e) => setModVideo(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm font-mono"
                        />
                        <span className="text-[9px] text-[#94A3B8]">
                          * Link an unlisted YouTube video or general streaming file source.
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-outline font-bold uppercase" htmlFor="mod-notes">Technical Core Objectives</label>
                        <textarea
                          id="mod-notes"
                          rows={4}
                          placeholder="Detail theoretical objectives and technical briefs..."
                          value={modNotes}
                          onChange={(e) => setModNotes(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Sub-sections: Resources and Assignments */}
                      <div className="border border-outline-variant/10 rounded-xl p-4 bg-surface-container-low/30">
                        <h4 className="text-body-sm font-bold text-on-surface mb-3 flex items-center gap-1">
                          <span className="material-symbols-outlined text-primary text-[18px]">attachment</span>
                          Reference Materials / PDFs
                        </h4>
                        
                        <div className="flex flex-col gap-2 mb-3">
                          {tempResources.map((res, index) => (
                            <div key={index} className="flex justify-between items-center gap-2 p-2 bg-[#0E131F]/40 border border-outline-variant/10 rounded-lg text-[11px]">
                              <span className="truncate max-w-[160px] font-bold font-mono">{res.name}</span>
                              <button
                                type="button"
                                onClick={() => setTempResources(tempResources.filter((_, i) => i !== index))}
                                className="text-red-400 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Resource Name"
                            value={resName}
                            onChange={(e) => setResName(e.target.value)}
                            className="bg-surface-container border border-outline-variant/30 text-on-surface rounded px-2.5 py-1.5 text-[11px] outline-none"
                          />
                          <select
                            value={resType}
                            onChange={(e) => setResType(e.target.value as any)}
                            className="bg-surface-container border border-outline-variant/30 text-on-surface rounded px-2 text-[11px]"
                          >
                            <option value="pdf">PDF Document</option>
                            <option value="zip">ZIP Workspace</option>
                            <option value="link">Web Link</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          placeholder="Download / Reference URL"
                          value={resUrl}
                          onChange={(e) => setResUrl(e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded px-2.5 py-1.5 text-[11px] outline-none mb-2 font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleAddResource}
                          className="w-full bg-[#1E293B] border border-outline-variant/20 text-on-surface text-[10px] font-bold py-1.5 rounded hover:bg-slate-800"
                        >
                          + ADD REFERENCE MATERIAL
                        </button>
                      </div>

                      <div className="border border-outline-variant/10 rounded-xl p-4 bg-surface-container-low/30 flex flex-col gap-2.5">
                        <h4 className="text-body-sm font-bold text-on-surface flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-500 text-[18px]">assignment</span>
                          Module Assignment Brief
                        </h4>
                        
                        <input
                          type="text"
                          placeholder="Assignment Title"
                          value={assignTitle}
                          onChange={(e) => setAssignTitle(e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded px-3 py-1.5 text-body-sm"
                        />
                        
                        <textarea
                          placeholder="Task Description instructions..."
                          rows={2}
                          value={assignDesc}
                          onChange={(e) => setAssignDesc(e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded px-3 py-1.5 text-body-sm leading-relaxed"
                        />

                        <input
                          type="text"
                          placeholder="Expected Deliverable format (e.g. GitHub URL)"
                          value={assignDeliverable}
                          onChange={(e) => setAssignDeliverable(e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded px-3 py-1.5 text-body-sm"
                        />
                      </div>

                      <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white text-label-caps py-3.5 rounded-lg font-bold tracking-widest transition-all">
                        {moduleEditingId ? "SAVE REVISED MODULE" : "PROVISION NEW MODULE"}
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Row 2: Published Syllabus Auditing list */}
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl flex flex-col gap-6">
                <h3 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">list_alt</span>
                  Active LMS Syllabus & Curriculum
                </h3>

                <div className="flex flex-col gap-6">
                  {weeks.map((wk) => (
                    <div key={wk.id} className="border border-outline-variant/10 rounded-xl p-5 bg-[#0E131F]/30 flex flex-col gap-4 relative">
                      
                      {/* Week Header */}
                      <div className="flex items-start justify-between gap-4 flex-wrap pb-3 border-b border-outline-variant/10">
                        <div className="flex-1">
                          <h4 className="text-body-lg font-black text-[#F8FAFC]">
                            Week {wk.weekNumber}: {wk.title}
                          </h4>
                          <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5 block">{wk.subtitle}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteWeekClick(wk.id)}
                          className="text-red-400 hover:underline text-[12px] flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span> Delete Week
                        </button>
                      </div>

                      {/* Week Modules list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wk.modules.map((m) => (
                          <div key={m.id} className="p-4 bg-surface-container rounded-lg border border-outline-variant/10 flex flex-col justify-between gap-3 group relative hover:border-amber-500/20 transition-all">
                            <div className="flex flex-col gap-1">
                              <span className="text-body-sm font-bold text-on-surface">{m.title}</span>
                              <span className="text-[10px] text-outline font-mono">{m.duration}</span>
                              <span className="text-[10px] text-outline-variant truncate mt-1 block font-mono">{m.videoUrl}</span>
                            </div>
                            <div className="flex items-center gap-2 border-t border-outline-variant/10 pt-2 mt-2">
                              <button
                                type="button"
                                onClick={() => handleEditModuleClick({ ...m, weekId: wk.id })}
                                className="text-[11px] text-amber-400 hover:underline font-bold flex items-center gap-0.5"
                              >
                                <span className="material-symbols-outlined text-[14px]">edit</span> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteModuleClick(m.id)}
                                className="text-[11px] text-red-400 hover:underline font-bold flex items-center gap-0.5 ml-auto"
                              >
                                <span className="material-symbols-outlined text-[14px]">delete</span> Revoke
                              </button>
                            </div>
                          </div>
                        ))}

                        {wk.modules.length === 0 && (
                          <p className="text-center py-6 text-body-sm text-[#64748B] col-span-3">No modules provisioned in this week yet.</p>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Global Announcements Creator & Listings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 3.1 Publish Announcement Form */}
                <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl flex flex-col gap-5">
                  <h3 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">campaign</span>
                    Broadcast Announcement
                  </h3>
                  
                  <form onSubmit={handlePublishAnnouncement} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-outline font-bold uppercase" htmlFor="ann-title">Notice Headline</label>
                      <input
                        id="ann-title"
                        type="text"
                        required
                        placeholder="e.g. Schedule Change: Week 3 Workshop"
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-outline font-bold uppercase" htmlFor="ann-content">Notice Content Details</label>
                      <textarea
                        id="ann-content"
                        required
                        rows={4}
                        placeholder="Input the announcement bulletin to present directly on student portals..."
                        value={annContent}
                        onChange={(e) => setAnnContent(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2 text-body-sm leading-relaxed"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-outline font-bold uppercase">Audience Tier Access</label>
                      <select
                        value={annTier}
                        onChange={(e) => setAnnTier(e.target.value)}
                        className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg px-3 py-2.5 text-body-sm"
                      >
                        <option value="All">All Registered Students</option>
                        <option value="Lite">Lite Access Only</option>
                        <option value="Regular">Regular Access Only</option>
                        <option value="Pro">Pro Verified Access Only</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-primary-fixed text-on-primary text-label-caps py-3 rounded-lg font-bold tracking-widest transition-all">
                      BROADCAST BULLETIN
                    </button>
                  </form>
                </div>

                {/* 3.2 Announcements Board */}
                <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl flex flex-col gap-6">
                  <h3 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">news</span>
                    Published Announcements Feed
                  </h3>
                  
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="p-4 bg-[#0E131F]/30 border border-outline-variant/10 rounded-xl flex items-start justify-between gap-4 card-hover">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-body-md font-extrabold text-[#F8FAFC]">{ann.title}</span>
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">{ann.tierAccess} Access</span>
                          </div>
                          <p className="text-body-sm text-[#94A3B8] leading-relaxed mt-2">{ann.content}</p>
                          <span className="text-[10px] text-outline font-mono block mt-2">{ann.createdAt}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          className="text-[#64748B] hover:text-red-400 p-2"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    ))}

                    {announcements.length === 0 && (
                      <p className="text-center py-8 text-body-sm text-outline">No global announcements broadcasted.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Row 4: Student Deliverables Submission Auditor (Real-time Auditing) */}
              <div className="glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl flex flex-col gap-6">
                <h3 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#F59E0B]">assignment_turned_in</span>
                  Student Assignments & Telemetry Submissions
                </h3>
                
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-1">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="glass-panel p-5 rounded-xl border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-500/20 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-body-lg font-bold text-[#F1F5F9]">{sub.studentName}</span>
                          <span className="text-body-sm text-[#94A3B8] font-mono">({sub.studentEmail})</span>
                          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">ID: {sub.id}</span>
                        </div>
                        
                        <div className="mt-2 text-[12px] text-[#64748B] flex items-center gap-1 font-bold">
                          <span className="material-symbols-outlined text-[16px] text-[#64748B]">menu_book</span>
                          {sub.moduleTitle}
                        </div>
                        
                        <div className="p-3 bg-[#0E131F]/50 border border-outline-variant/10 rounded-lg text-body-sm font-mono text-amber-300 mt-2 break-all max-w-[720px]">
                          {sub.submissionText}
                        </div>
                        
                        <span className="text-[10px] text-outline font-mono block mt-2">Delivered: {sub.createdAt}</span>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 shrink-0 self-stretch md:self-auto justify-end">
                        <button
                          onClick={() => {
                            setSuccessMessage(`Submission for ${sub.studentName} approved & marked passing!`);
                            handleDeleteSubmission(sub.id);
                            setTimeout(() => setSuccessMessage(""), 4000);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-label-caps px-4 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">verified</span> Verify Work
                        </button>
                        <button
                          onClick={() => handleDeleteSubmission(sub.id)}
                          className="border border-outline-variant/30 hover:border-red-400 text-[#94A3B8] hover:text-red-400 text-label-caps px-4 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span> Dismiss
                        </button>
                      </div>
                    </div>
                  ))}

                  {submissions.length === 0 && (
                    <p className="text-center py-8 text-body-sm text-outline">No pending student deliverables found in the queue.</p>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
