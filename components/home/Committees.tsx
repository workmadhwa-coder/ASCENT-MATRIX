import React from 'react';

interface Member {
  name: string;
  affiliation: string;
  role: string;
  image?: string;
}

/* ===================== ADVISORY COUNCIL ===================== */
const ADVISORY_COUNCIL: Member[] = [
  {
    name: "Dr. Gurumoorthy",
    affiliation: "Director - FSID, IISc",
    role: "Chairperson",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538482/gurumoorty_edyxk9.jpg"
  },
  {
    name: "Ms. Pamela Kumar",
    affiliation: "Chief Strategy Advisor(Telecom & Data). FSID-IISC",
    role: "Vice Chair",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536758/pamela_kumar_sk27yh.jpg"
  },
  {
    name: "Dr. Mahadeva Prasanna",
    affiliation: "Director, IIIT-Dharwad",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538776/mahadev_prasanna_omuzez.jpg"
  },
  {
    name: "Dr. Brajesh Mishra",
    affiliation: "Deputy Director General, Ministry of Communication, Government of India & Head, C-DOT",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538481/brajesh_mishra_vxwogl.jpg"
  },
  {
    name: "Dr. Shankar Venugopal",
    affiliation: "Head of Innovation, M&M",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536761/shankar_venugol_tbweoy.jpg"
  },
  {
    name: "Mr. Jitendra Chadda",
    affiliation: "MD/ India Country Head, GlobalFoundries",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538482/jitendra_chaddah_wjez2a.jpg"
  },
  {
    name: "Dr. Sashi Kumaar",
    affiliation: " Founder, ZenteiQ.ai",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534705/1758418544838_gefyin.jpg"
  },
  {
    name: "Dr. Bharadwaj Amrutur",
    affiliation: "Executive Director - ARTPARK, IISc",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538464/bhardhwaj_ccc8hs.png"
  },
  {
    name: "Mr. Ashok Kumar",
    affiliation: "Dy. Director General, Depatment of Telecom, ITU, Govt of India",
    role: "Invitee",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538463/ashok_kumar_vehuyi.jpg"
  },
  {
    name: "Dr. Raj Hirwani",
    affiliation: " Emeritus Professor at AcSI",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538482/raj_hirwani_xgymyc.jpg"
  },
  {
    name: "Mr. Ananthanarayanan Shanmugam",
    affiliation: " Sr. VP - Industrial Sectors, Invest India",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767775576/AnanthPhoto2_hduti9.jpg"
  }
];

/* ===================== ORGANIZING COMMITTEE (IMAGES UPDATED) ===================== */
const ORGANIZING_COMMITTEE: Member[] = [
  {
    name: "Mr. Parag Agarwal",
    affiliation: "Director in DoT",
    role: "DOT Invitee",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541560/parag_agarwal_xo5uki.jpg"
  },
  {
    name: "Dr. Sudheendra Koushik",
    affiliation: "IEEE-TEMS",
    role: "Chairperson",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541578/sudheendra_koushik_jdkq1b.jpg"
  },
  {
    name: "Dr. Brinda Varma",
    affiliation: "Aekam legal",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541551/brinda_abceq8.jpg"
  },
  {
    name: "Dr. S K Murthy",
    affiliation: "Founder, SKLS",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767554632/skm_texgc4.jpg"
  },
  {
    name: "Mr. S B Shivadithya",
    affiliation: "SS Inphinite",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541580/shivva_lsdzr4.png"
  },
  {
    name: "Dr. Lakshmi Gandikota",
    affiliation: "FSID, IISc",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541557/Lakshmi_Gandikota_l3tjkb.png"
  },
  {
    name: "Dr. Vijay Singh",
    affiliation: "IPTel, IISc",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541592/vijay_singh_ji0dno.png"
  },
  {
    name: "Mr. Nitin Sharma",
    affiliation: "Qualcomm India",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534705/nithin_sharma_morezt.jpg"
  },
  {
    name: "Mr. Sanjay Sahay",
    affiliation: "TechConpro",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541564/sanjay_sahay_gt3rpd.jpg"
  },
  {
    name: "Mr. Siddesh Math",
    affiliation: "AMD India",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541576/siddhesh_kth4e3.jpg"
  },
  {
    name: "Mr. Suman Bhattacharya",
    affiliation: "HUL",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541582/suman_f9eu8c.jpg"
  },
  {
    name: "Mr. Ananth SripadaRao",
    affiliation: "SKLS",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541528/ananth_tmsjbo.jpg"
  },
  {
    name: "Mr. Prithvi Chaithanya",
    affiliation: "Hexagon",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541562/prithvi_nubfjm.jpg"
  },
  {
    name: "Dr. S B Bhanu Prashanth",
    affiliation: "BMSCE",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541537/bhanuprashanth_yvb2uu.jpg"
  },
  {
    name: "Mr. Trivikram Jagirdar",
    affiliation: "Madhwa Infotech",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541591/trivikram_vpdmpn.jpg"
  },
  {
    name: "Mr. Dhananjay R.",
    affiliation: "Flexera",
    role: "Member",
    image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541790/dhananjay_rtwl7s.jpg"
  }
];

/* ===================== GRID COMPONENT ===================== */
const CommitteeGrid = ({ title, members }: { title: string; members: Member[] }) => {
  const isOrganizing = title === "Organizing Committee";

  return (
    <div className="mb-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-8 w-1.5 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
          {title} <span className="text-zinc-600 text-sm not-italic font-bold ml-2"></span>
        </h3>
      </div>

      {/* DESKTOP GRID (UNCHANGED) */}
      <div className={`hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`}>
        {members.map((member, i) => (
          <div key={i} className="group bg-zinc-900/60 rounded-2xl border border-white/5 p-4 transition-all duration-300 hover:bg-zinc-800 hover:border-purple-500/30 hover:-translate-y-2">
            <div className="aspect-square rounded-xl bg-zinc-800 border border-white/10 mb-4 overflow-hidden grayscale group-hover:grayscale-0">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-white font-black uppercase text-[11px] mb-1">{member.name}</h4>
            <p className="text-zinc-500 text-[9px] font-bold uppercase">{member.affiliation}</p>
          </div>
        ))}
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        {!isOrganizing ? (
          <div className="grid grid-cols-2 gap-4">
            {members.map((member, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-3">
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-white text-xs font-bold uppercase">{member.name}</h4>
                <p className="text-zinc-400 text-[10px] uppercase">{member.affiliation}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {members.map((member, i) => (
              <div key={i} className="flex items-center gap-4 bg-zinc-900 rounded-xl p-3">
                <img src={member.image} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="text-white text-sm font-bold">{member.name}</h4>
                  <p className="text-zinc-400 text-xs">{member.affiliation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ===================== MAIN EXPORT ===================== */
export const Committees = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <CommitteeGrid title="Advisory Council" members={ADVISORY_COUNCIL} />
        <CommitteeGrid title="Organizing Committee" members={ORGANIZING_COMMITTEE} />
      </div>
    </section>
  );
};
