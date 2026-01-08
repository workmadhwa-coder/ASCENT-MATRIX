import React from 'react';

interface SessionPerson {
  name: string;
  title: string;
  image: string;
}

interface Session {
  time: string;
  title: string;
  people: SessionPerson[];
}

const PLACEHOLDER =
  "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534705/1758418544838_gefyin.jpg";

const SCHEDULE: Session[] = [
  {
    time: "10:00 - 11:00 AM",
    title: "Inauguration",
    people: [
      {
        name: "Shri D. K. Shivakumar",
        title: "Hon'ble Deputy Chief Minister of Karnataka",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534703/dks_dbkskr.jpg"
      },
      {
        name: "Shri M. B. Patil",
        title: "Hon'ble Minister for Large & Medium Industries and Infrastructure Development, GoK",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767713208/mb_patil_boe7oo.jpg"
      },
      {
        name: "Shri Priyanka Kharge",
        title: "Hon'ble Minister for IT - BT  and Rural Development & Panchayat Raj, GoK",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534705/priyank_karge_xli1g4.jpg"
      },
      {
        name: "Dr. M. C. Sudhakar",
        title: "Hon'ble Minister for Higher Education,GoK",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767685967/MC-Sudhakar_casbyd.png"
      },
      {
        name: "Dr. Ashwath Narayan",
        title: "MLA, Malleshwaram, Fmr. Dy. CM, Fmr. Minister for Higher Education and E, IT-BT, GoK",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767776819/AshwathNarayan01_dpz3yt.jpg"
      },
      {
        name: "Prof. Ajay Kumar Sood",
        title: "Principal Scientific Adviser to the Govt of India",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767713351/Ajay-Kumar-Sood-FRS_mudtpm.jpg"
      },
      {
        name: "Dr. S Somanath",
        title: "Adjunct Prof. & Fmr. Chairman, ISRO",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767713441/somanath_gmzg2w.jpg"
      },
      {
        name: "ms. Revathi Kamath",
        title: "Environmentalist and Philanthropist",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536760/revathi_kamat_coszoy.jpg"
      },
      {
        name: "ms. Nivruti Rai",
        title: " MD and CEO Invest India - FDI & Trade, Ministry of Commerce and Industry",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536758/nivruti_rai_a29cwb.jpg"
      },
      {
        name: "Dr. Shivakumar Kalyanram",
        title: " CEO, Anusandhan National Research Foundation (ANRF), Govt of India",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767713743/shivakumar_anrff_rcv0st.jpg"
      }
    ]
  },
  {
    time: "11:00 - 12:40 PM",
    title: "Keynotes",
    people: [
      {
        name: "ms. Gunjan Krishna, IAS",
        title: " IAS - Commissioner for Industrial Development and Director, Department of Industries & Commerce, GoK",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534703/gunjankrishna_wdhfuj.jpg"
      },
      {
        name: "Dr. Manjula N, IAS",
        title: "Secretary, Department of Electronics, IT, Bt and S&T, GoK",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534704/Manjula_N_mo8llc.png"
      },
      {
        name: "Dr. Sashi Kumaar Ganeshan",
        title: "Founder, ZenteiQ.ai",
        image: PLACEHOLDER
      },
      {
        name: "Mr. Harishankaran K",
        title: "Co-Founder & CTO, HackerRank",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534702/hari_vw5quv.jpg"
      },
      {
        name: "mr. Sreenivas Subramoney",
        title: "Distinguished Engineer, Nvidia",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767686580/Sreenivas_Subramoney_crlutr.jpg"
      },
      {
        name: "ms. Pamela Kumar",
        title: "Chief Strategy Advisor(Telecom & Data). FSID-IISC",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536758/pamela_kumar_sk27yh.jpg"
      },
      {
        name: "mr. Prashanth Prakash",
        title: "Founding Partner, Accel",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536759/prashanth_prakash_dqtt07.jpg"
      },
      {
        name: "Mr. Sanjay Sahay, IPS",
        title: "Fmr. ADGP & Founder, TechConPro Pvt Ltd",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536761/sanjay_sahay_wvipyu.jpg"
      },
      {
        name: "Dr. Shyam Vasudev Rao",
        title: " Founder and Director, Forus Health & Renalyx",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767774438/Shyam_eblque.png"
      },
      {
        name: "mr. S. G. Venkatesh",
        title: "Senior Vice President - BFSI, Tech Mahindra",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536760/s_g_venkatesh_sxchrj.jpg"
      },
      {
        name: "Dr. Balakrishna Shetty",
        title: "Founder – Isha Diagnostics",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536758/balakrishna_ska3yd.png"
      }
    ]
  },
  {
    time: "12:40 - 01:30",
    title: "Networking & Lunch Break",
    people: []
  },
  {
    time: "01:30 - 02:30 PM",
    title: "Reverse Pitch",
    people: [
      {
        name: "mr. Niladri",
        title: " VP & Country Head for India, Flexera & Angel Investor",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534704/niladri_ray_rb49i0.jpg"
      },
      {
        name: "Mr. Narendra Bhandari",
        title: " General Partner at seafund & Venture Capitalist",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534704/narendra_zm0nj5.jpg"
      },
      {
        name: "Mr. Naganand Doraswamy",
        title: "Managing Partner & Founder at Ideaspring Capital",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534704/naganad_doreswamy_nncmga.jpg"
      },
      {
        name: "Ms. Aisshwarya DKS Hegde",
        title: "Edupreneur and Investor",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534703/aishwarya_hedge_idplnu.jpg"
      }
    ]
  },
  {
    time: "02:20 - 04:05 PM",
    title: "Panel Discussion",
    people: [
      {
        name: "Dr. Mahadev Prasanna",
        title: "Director, IIIT - Dharwad",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767538776/mahadev_prasanna_omuzez.jpg"
      },
      {
        name: "Dr. Shankar Venugopal",
        title: "Vice President, Mahindra & Mahindra",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536761/shankar_venugol_tbweoy.jpg"
      },
      {
        name: " Mr. B. S. Vishnuvardhan",
        title: "Sr. Program Director, Bosch Global Software Technologies",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534705/vishnuvardhan_c9i0iv.jpg"
      },
      {
        name: "mr. Nitin Sharma",
        title: "Sr. Director, Technology/Patent Counsel, Qualcomm",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767534705/nithin_sharma_morezt.jpg"
      },
      {
        name: "dr. Ravi Tumkur",
        title: "Head of Patents, SATATHAM KRITAM LEGAL SOLUTIONS",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767774870/ravi_tumkur_lbj8ab.png  "
      },
      {
        name: "Dr. Piyush Kumar Soni",
        title: "Dean, GATCIE",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536760/piyussh_suzthn.png"
      },
      {
        name: "Dr. Suma",
        title: "Director, BIG Foundation",
        image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767536766/suma_qdlnyh.jpg"
      }
    ]
  },
  {
  time: "Throughout the Event",
  title: "Speed Mentors & Product Demos",
  people: [
    { 
      name: "Mentors", 
      title: "Legal & Financial Experts", 
      image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541557/Lakshmi_Gandikota_l3tjkb.png" 
    },
    { 
      name: "Consultants", 
      title: "Banks & Startups", 
      image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541557/Lakshmi_Gandikota_l3tjkb.png" 
    },
    { 
      name: "MSMEs", 
      title: "Product Demonstrations", 
      image: "https://res.cloudinary.com/dzss2fubc/image/upload/v1767541557/Lakshmi_Gandikota_l3tjkb.png" 
    }
  ]
}
];

export const Portfolio = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter">
            THE INAUGURAL <span className="text-zinc-700"></span>{" "}
            <span className="text-purple-500">PORTFOLIO</span>
          </h2>

          <div className="w-32 h-2 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>

          <p className="text-zinc-500 mt-6 font-bold uppercase tracking-[0.2em] text-sm">
            Defining the Innovation Agenda for Bengaluru 2026
          </p>

          {/* DISCLAIMER */}
          <p className="mt-4 text-xs text-zinc-500 italic max-w-3xl mx-auto leading-relaxed">
            * All guests, representatives and facilitators listed are invited and
            their participation remains subject to individual availability and
            confirmation.
          </p>
        </div>

        <div className="space-y-32">
          {SCHEDULE.map((session, idx) => (
            <div key={idx}>
              <div className={`flex flex-col md:flex-row items-baseline gap-6 border-b border-zinc-800 ${session.people.length === 0 ? 'mb-4 pb-4' : 'mb-12 pb-6'}`}>
                <div className="bg-zinc-900 px-6 py-2 rounded-lg border border-purple-500/30">
                  <span className="text-xl font-black text-purple-400 font-mono">
                    {session.time}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic">
                  {session.title}
                </h3>
              </div>

              {session.people.length > 0 && (
              <div className={session.title === "Speed Mentors & Product Demos" ? "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" : "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"}>
                {session.people.map((person, pIdx) => (
                  session.title === "Speed Mentors & Product Demos" ? (
                    <div key={pIdx} className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center min-h-48 text-center">
                      <h4 className="text-black font-black uppercase text-lg mb-3">
                        {person.name}
                      </h4>
                      <p className="text-black text-xs uppercase font-bold">
                        {person.title}
                      </p>
                    </div>
                  ) : (
                    <div key={pIdx} className="bg-zinc-900/40 rounded-2xl p-4">
                      <div className="aspect-square rounded-xl overflow-hidden mb-5">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover md:grayscale md:hover:grayscale-0 transition"
                        />
                      </div>
                      <h4 className="text-white font-black uppercase text-sm mb-2">
                        {person.name}
                      </h4>
                      <p className="text-zinc-500 text-xs uppercase">
                        {person.title}
                      </p>
                    </div>
                  )
                ))}
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
