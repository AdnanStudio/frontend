import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Users, Shield, Award } from 'lucide-react';
import './AdministrationPages.css';

const GoverningBody = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="content-page-wrapper">
        <div className="container">
          <SkeletonLoader type="title" />
          <SkeletonLoader type="text" count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Governing Body</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            মালখানগর কলেজের পরিচালনা পর্ষদ
          </p>
        </div>

        <div className="content-body">
          <div className="governing-intro">
            <Users size={48} />
            <p>
              মালখানগর কলেজ পরিচালনা পর্ষদ কলেজের সার্বিক উন্নয়ন, নীতি নির্ধারণ এবং শিক্ষার মান উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করে। পর্ষদ নিয়মিত সভা আয়োজন করে এবং কলেজের সকল গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণ করে থাকে।
            </p>
          </div>

          <div className="governing-structure">
            <h2>পরিচালনা পর্ষদের সদস্যবৃন্দ</h2>

            <div className="member-card president-card">
              <div className="member-badge">
                <Shield size={32} />
              </div>
              <div className="member-info">
                <h3>সভাপতি</h3>
                <h4>জনাব মোহাম্মদ আলী</h4>
                <p className="designation">উপজেলা নির্বাহী অফিসার</p>
                <p className="details">
                  পরিচালনা পর্ষদের সভাপতি হিসেবে কলেজের সার্বিক তত্ত্বাবধান এবং নীতি নির্ধারণে নেতৃত্ব প্রদান করেন। তিনি স্থানীয় প্রশাসনের প্রতিনিধি হিসেবে কলেজ ও সরকারের মধ্যে সেতুবন্ধন হিসেবে কাজ করেন।
                </p>
              </div>
            </div>

            <div className="members-grid">
              <div className="member-card">
                <div className="member-role">সদস্য সচিব</div>
                <h4>অধ্যক্ষ (ভারপ্রাপ্ত)</h4>
                <p className="member-name">মালখানগর কলেজ</p>
                <p className="member-description">
                  পরিচালনা পর্ষদের সকল সভার কার্যবিবরণী সংরক্ষণ এবং সিদ্ধান্ত বাস্তবায়নের দায়িত্ব পালন করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাব আবদুল হামিদ</h4>
                <p className="member-name">উপজেলা শিক্ষা অফিসার</p>
                <p className="member-description">
                  শিক্ষা মন্ত্রণালয়ের প্রতিনিধি হিসেবে শিক্ষার মান নিয়ন্ত্রণ ও উন্নয়নে পরামর্শ প্রদান করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাব কামরুল ইসলাম</h4>
                <p className="member-name">স্থানীয় সংসদ সদস্য প্রতিনিধি</p>
                <p className="member-description">
                  সংসদ সদস্যের পক্ষ থেকে কলেজের উন্নয়ন কার্যক্রমে সহায়তা এবং তত্ত্বাবধান করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাব মোঃ রফিকুল ইসলাম</h4>
                <p className="member-name">অভিভাবক প্রতিনিধি</p>
                <p className="member-description">
                  শিক্ষার্থীদের অভিভাবকদের পক্ষ থেকে কলেজের নীতি নির্ধারণে মতামত প্রদান করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাবা সালেহা বেগম</h4>
                <p className="member-name">মহিলা প্রতিনিধি</p>
                <p className="member-description">
                  মহিলা শিক্ষার্থীদের স্বার্থ রক্ষা এবং তাদের সমস্যা সমাধানে বিশেষ ভূমিকা পালন করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>অধ্যাপক ড. মাহমুদুল হাসান</h4>
                <p className="member-name">শিক্ষক প্রতিনিধি</p>
                <p className="member-description">
                  শিক্ষকমণ্ডলীর পক্ষ থেকে শিক্ষা কার্যক্রম ও একাডেমিক বিষয়ে পরামর্শ প্রদান করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাব হাজী আবদুল করিম</h4>
                <p className="member-name">স্থানীয় শিক্ষানুরাগী</p>
                <p className="member-description">
                  কলেজের প্রতিষ্ঠাতা সদস্য এবং দীর্ঘদিন ধরে শিক্ষা উন্নয়নে অবদান রেখে চলেছেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাব নাজমুল হুদা</h4>
                <p className="member-name">ব্যবসায়ী প্রতিনিধি</p>
                <p className="member-description">
                  স্থানীয় ব্যবসায়ী সমাজের পক্ষ থেকে কলেজের আর্থিক ও অবকাঠামো উন্নয়নে সহায়তা করেন।
                </p>
              </div>

              <div className="member-card">
                <div className="member-role">সদস্য</div>
                <h4>জনাব মুক্তাদির হোসেন</h4>
                <p className="member-name">প্রাক্তন শিক্ষার্থী প্রতিনিধি</p>
                <p className="member-description">
                  প্রাক্তন শিক্ষার্থীদের পক্ষ থেকে কলেজের উন্নয়ন ও ঐতিহ্য রক্ষায় কাজ করেন।
                </p>
              </div>
            </div>
          </div>

          <div className="governing-responsibilities">
            <h2>পরিচালনা পর্ষদের দায়িত্ব ও কার্যাবলী</h2>
            <div className="responsibilities-grid">
              <div className="responsibility-card">
                <Award size={40} />
                <h4>নীতি নির্ধারণ</h4>
                <p>
                  কলেজের শিক্ষা নীতি, ভর্তি নীতি এবং পরীক্ষা পদ্ধতি নির্ধারণ করা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>বাজেট অনুমোদন</h4>
                <p>
                  বার্ষিক বাজেট প্রণয়ন ও অনুমোদন এবং আর্থিক স্বচ্ছতা নিশ্চিত করা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>শিক্ষক নিয়োগ</h4>
                <p>
                  যোগ্য শিক্ষক নিয়োগ এবং তাদের পদোন্নতি সংক্রান্ত সিদ্ধান্ত গ্রহণ।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>অবকাঠামো উন্নয়ন</h4>
                <p>
                  কলেজের ভবন, শ্রেণিকক্ষ এবং অন্যান্য সুবিধা উন্নয়নের পরিকল্পনা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>একাডেমিক তত্ত্বাবধান</h4>
                <p>
                  শিক্ষার মান নিয়ন্ত্রণ এবং একাডেমিক কার্যক্রম মনিটরিং করা।
                </p>
              </div>

              <div className="responsibility-card">
                <Award size={40} />
                <h4>সমস্যা সমাধান</h4>
                <p>
                  শিক্ষার্থী, শিক্ষক ও অভিভাবকদের সমস্যা সমাধানে কার্যকর পদক্ষেপ নেওয়া।
                </p>
              </div>
            </div>
          </div>

          <div className="meeting-schedule">
            <h2>সভার সময়সূচি</h2>
            <div className="meeting-info">
              <div className="meeting-card">
                <h4>নিয়মিত সভা</h4>
                <p>প্রতি মাসের প্রথম শনিবার</p>
                <span className="time">সকাল ১০:০০ টা</span>
              </div>

              <div className="meeting-card">
                <h4>জরুরি সভা</h4>
                <p>প্রয়োজন অনুযায়ী</p>
                <span className="time">সভাপতি কর্তৃক আহূত</span>
              </div>

              <div className="meeting-card">
                <h4>বার্ষিক সাধারণ সভা</h4>
                <p>বছরে একবার</p>
                <span className="time">জানুয়ারি মাসে</span>
              </div>
            </div>
          </div>

          <div className="transparency-section">
            <h2>স্বচ্ছতা ও জবাবদিহিতা</h2>
            <p>
              মালখানগর কলেজ পরিচালনা পর্ষদ সম্পূর্ণ স্বচ্ছতা ও জবাবদিহিতার সাথে কাজ করে। সকল সভার কার্যবিবরণী সংরক্ষণ করা হয় এবং গুরুত্বপূর্ণ সিদ্ধান্তসমূহ কলেজ ওয়েবসাইটে প্রকাশ করা হয়। অভিভাবক এবং শিক্ষার্থীরা যেকোনো সময় পরিচালনা পর্ষদের কাছে তাদের মতামত ও পরামর্শ প্রদান করতে পারেন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoverningBody;



// import React, { useState, useEffect } from 'react';
// import SkeletonLoader from '../../components/SkeletonLoader';
// import { Users, Shield, Award } from 'lucide-react';
// import './AdministrationPages.css';

// const GoverningBody = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 800);
//     window.scrollTo(0, 0);
//   }, []);

//   if (loading) {
//     return (
//       <div className="content-page-wrapper">
//         <div className="container">
//           <SkeletonLoader type="title" />
//           <SkeletonLoader type="text" count={8} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="content-page-wrapper">
//       <div className="container">
//         <div className="page-header">
//           <h1>Governing Body</h1>
//           <div className="title-underline"></div>
//           <p className="page-subtitle">
//             মালখানগর কলেজের পরিচালনা পর্ষদ
//           </p>
//         </div>

//         <div className="content-body">
//           <div className="governing-intro">
//             <Users size={48} />
//             <p>
//               মালখানগর কলেজ পরিচালনা পর্ষদ কলেজের সার্বিক উন্নয়ন, নীতি নির্ধারণ এবং শিক্ষার মান উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করে। পর্ষদ নিয়মিত সভা আয়োজন করে এবং কলেজের সকল গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণ করে থাকে।
//             </p>
//           </div>

//           <div className="governing-structure">
//             <h2>পরিচালনা পর্ষদের সদস্যবৃন্দ</h2>

//             <div className="member-card president-card">
//               <div className="member-badge">
//                 <Shield size={32} />
//               </div>
//               <div className="member-info">
//                 <h3>সভাপতি</h3>
//                 <h4>জনাব মোহাম্মদ আলী</h4>
//                 <p className="designation">উপজেলা নির্বাহী অফিসার</p>
//                 <p className="details">
//                   পরিচালনা পর্ষদের সভাপতি হিসেবে কলেজের সার্বিক তত্ত্বাবধান এবং নীতি নির্ধারণে নেতৃত্ব প্রদান করেন। তিনি স্থানীয় প্রশাসনের প্রতিনিধি হিসেবে কলেজ ও সরকারের মধ্যে সেতুবন্ধন হিসেবে কাজ করেন।
//                 </p>
//               </div>
//             </div>

//             <div className="members-grid">
//               <div className="member-card">
//                 <div className="member-role">সদস্য সচিব</div>
//                 <h4>অধ্যক্ষ (ভারপ্রাপ্ত)</h4>
//                 <p className="member-name">মালখানগর কলেজ</p>
//                 <p className="member-description">
//                   পরিচালনা পর্ষদের সকল সভার কার্যবিবরণী সংরক্ষণ এবং সিদ্ধান্ত বাস্তবায়নের দায়িত্ব পালন করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব আবদুল হামিদ</h4>
//                 <p className="member-name">উপজেলা শিক্ষা অফিসার</p>
//                 <p className="member-description">
//                   শিক্ষা মন্ত্রণালয়ের প্রতিনিধি হিসেবে শিক্ষার মান নিয়ন্ত্রণ ও উন্নয়নে পরামর্শ প্রদান করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব কামরুল ইসলাম</h4>
//                 <p className="member-name">স্থানীয় সংসদ সদস্য প্রতিনিধি</p>
//                 <p className="member-description">
//                   সংসদ সদস্যের পক্ষ থেকে কলেজের উন্নয়ন কার্যক্রমে সহায়তা এবং তত্ত্বাবধান করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব মোঃ রফিকুল ইসলাম</h4>
//                 <p className="member-name">অভিভাবক প্রতিনিধি</p>
//                 <p className="member-description">
//                   শিক্ষার্থীদের অভিভাবকদের পক্ষ থেকে কলেজের নীতি নির্ধারণে মতামত প্রদান করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব সালেহা বেগম</h4>
//                 <p className="member-name">মহিলা প্রতিনিধি</p>
//                 <p className="member-description">
//                   মহিলা শিক্ষার্থীদের স্বার্থ রক্ষা এবং তাদের সমস্যা সমাধানে বিশেষ ভূমিকা পালন করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>অধ্যাপক ড. মাহমুদুল হাসান</h4>
//                 <p className="member-name">শিক্ষক প্রতিনিধি</p>
//                 <p className="member-description">
//                   শিক্ষকমণ্ডলীর পক্ষ থেকে শিক্ষা কার্যক্রম ও একাডেমিক বিষয়ে পরামর্শ প্রদান করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব হাজী আবদুল করিম</h4>
//                 <p className="member-name">স্থানীয় শিক্ষানুরাগী</p>
//                 <p className="member-description">
//                   কলেজের প্রতিষ্ঠাতা সদস্য এবং দীর্ঘদিন ধরে শিক্ষা উন্নয়নে অবদান রেখে চলেছেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব নাজমুল হুদা</h4>
//                 <p className="member-name">ব্যবসায়ী প্রতিনিধি</p>
//                 <p className="member-description">
//                   স্থানীয় ব্যবসায়ী সমাজের পক্ষ থেকে কলেজের আর্থিক ও অবকাঠামো উন্নয়নে সহায়তা করেন।
//                 </p>
//               </div>

//               <div className="member-card">
//                 <div className="member-role">সদস্য</div>
//                 <h4>জনাব মুক্তাদির হোসেন</h4>
//                 <p className="member-name">প্রাক্তন শিক্ষার্থী প্রতিনিধি</p>
//                 <p className="member-description">
//                   প্রাক্তন শিক্ষার্থীদের পক্ষ থেকে কলেজের উন্নয়ন ও ঐতিহ্য রক্ষায় কাজ করেন।
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="governing-responsibilities">
//             <h2>পরিচালনা পর্ষদের দায়িত্ব ও কার্যাবলী</h2>
//             <div className="responsibilities-grid">
//               <div className="responsibility-card">
//                 <Award size={40} />
//                 <h4>নীতি নির্ধারণ</h4>
//                 <p>
//                   কলেজের শিক্ষা নীতি, ভর্তি নীতি এবং পরীক্ষা পদ্ধতি নির্ধারণ করা।
//                 </p>
//               </div>

//               <div className="responsibility-card">
//                 <Award size={40} />
//                 <h4>বাজেট অনুমোদন</h4>
//                 <p>
//                   বার্ষিক বাজেট প্রণয়ন ও অনুমোদন এবং আর্থিক স্বচ্ছতা নিশ্চিত করা।
//                 </p>
//               </div>

//               <div className="responsibility-card">
//                 <Award size={40} />
//                 <h4>শিক্ষক নিয়োগ</h4>
//                 <p>
//                   যোগ্য শিক্ষক নিয়োগ এবং তাদের পদোন্নতি সংক্রান্ত সিদ্ধান্ত গ্রহণ।
//                 </p>
//               </div>

//               <div className="responsibility-card">
//                 <Award size={40} />
//                 <h4>অবকাঠামো উন্নয়ন</h4>
//                 <p>
//                   কলেজের ভবন, শ্রেণিকক্ষ এবং অন্যান্য সুবিধা উন্নয়নের পরিকল্পনা।
//                 </p>
//               </div>

//               <div className="responsibility-card">
//                 <Award size={40} />
//                 <h4>একাডেমিক তত্ত্বাবধান</h4>
//                 <p>
//                   শিক্ষার মান নিয়ন্ত্রণ এবং একাডেমিক কার্যক্রম মনিটরিং করা।
//                 </p>
//               </div>

//               <div className="responsibility-card">
//                 <Award size={40} />
//                 <h4>সমস্যা সমাধান</h4>
//                 <p>
//                   শিক্ষার্থী, শিক্ষক ও অভিভাবকদের সমস্যা সমাধানে কার্যকর পদক্ষেপ নেওয়া।
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="meeting-schedule">
//             <h2>সভার সময়সূচি</h2>
//             <div className="meeting-info">
//               <div className="meeting-card">
//                 <h4>নিয়মিত সভা</h4>
//                 <p>প্রতি মাসের প্রথম শনিবার</p>
//                 <span className="time">সকাল ১০:০০ টা</span>
//               </div>

//               <div className="meeting-card">
//                 <h4>জরুরি সভা</h4>
//                 <p>প্রয়োজন অনুযায়ী</p>
//                 <span className="time">সভাপতি কর্তৃক আহূত</span>
//               </div>

//               <div className="meeting-card">
//                 <h4>বার্ষিক সাধারণ সভা</h4>
//                 <p>বছরে একবার</p>
//                 <span className="time">জানুয়ারি মাসে</span>
//               </div>
//             </div>
//           </div>

//           <div className="transparency-section">
//             <h2>স্বচ্ছতা ও জবাবদিহিতা</h2>
//             <p>
//               মালখানগর কলেজ পরিচালনা পর্ষদ সম্পূর্ণ স্বচ্ছতা ও জবাবদিহিতার সাথে কাজ করে। সকল সভার কার্যবিবরণী সংরক্ষণ করা হয় এবং গুরুত্বপূর্ণ সিদ্ধান্তসমূহ কলেজ ওয়েবসাইটে প্রকাশ করা হয়। অভিভাবক এবং শিক্ষার্থীরা যেকোনো সময় পরিচালনা পর্ষদের কাছে তাদের মতামত ও পরামর্শ প্রদান করতে পারেন।
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoverningBody;