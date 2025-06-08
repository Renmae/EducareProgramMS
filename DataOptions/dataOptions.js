export const civilStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Widowed", value: "Widowed" },
  { label: "Separated", value: "Separated" },
];

export const religionOptions = [
  { label: "Select Religion...", value: "" },
  { label: "Roman Catholic", value: "Catholic" },
  { label: "Islam", value: "Islam" },
  { label: "Iglesia ni Cristo", value: "INC" },
  { label: "Seventh Day Adventists", value: "Adventists" },
  { label: "Born Again Christian", value: "Born Again" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Other", value: "Other" },
];

export const nationalityOptions = [
  { label: "Select Nationality...", value: "" },
  { label: "Filipino", value: "Filipino" },
  { label: "Dual Citizenship", value: "Dual" },
  { label: "Foreigner", value: "Foreigner" },
];

export const regionOptions = [
    { label: "Select Region...", value: "" },
    { label: "NCR - National Capital Region", value: "NCR" },
    { label: "CAR - Cordillera Administrative Region", value: "CAR" },
    { label: "Region I - Ilocos Region", value: "Region I" },
    { label: "Region II - Cagayan Valley", value: "Region II" },
    { label: "Region III - Central Luzon", value: "Region III" },
    { label: "Region IV-A - CALABARZON", value: "Region IV-A" },
    { label: "Region IV-B - MIMAROPA", value: "Region IV-B" },
    { label: "Region V - Bicol Region", value: "Region V" },
    { label: "Region VI - Western Visayas", value: "Region VI" },
    { label: "Region VII - Central Visayas", value: "Region VII" },
    { label: "Region VIII - Eastern Visayas", value: "Region VIII" },
    { label: "Region IX - Zamboanga Peninsula", value: "Region IX" },
    { label: "Region X - Northern Mindanao", value: "Region X" },
    { label: "Region XI - Davao Region", value: "Region XI" },
    { label: "Region XII - SOCCSKSARGEN", value: "Region XII" },
    { label: "Region XIII - Caraga", value: "Region XIII" },
    { label: "BARMM - Bangsamoro Autonomous Region", value: "BARMM" },
    { label: "Outside Philippines", value: "Outside PH" },
  ];
  
  export const provinceOptions = [
    { label: "Select Province...", value: "" },
    { label: "Camarines Sur", value: "Camarines Sur", region: "Region V" },
    { label: "Albay", value: "Albay", region: "Region V" },
    { label: "Sorsogon", value: "Sorsogon", region: "Region V" },
    { label: "Catanduanes", value: "Catanduanes", region: "Region V" },
    { label: "Camarines Norte", value: "Camarines Norte", region: "Region V" },
    { label: "Masbate", value: "Masbate", region: "Region V" },
    { label: "Outside Region V", value: "Outside Region V" },
  ];
  
  export const cityMunicipalityOptions = [
    { label: "Select Municipality/City...", value: "" },
    // CamSur Cities
    { label: "Naga City", value: "Naga City", province: "Camarines Sur" },
    { label: "Pili", value: "Pili", province: "Camarines Sur" },
    { label: "Iriga City", value: "Iriga City", province: "Camarines Sur" },
    { label: "Canaman", value: "Canaman", province: "Camarines Sur" },
    { label: "Bombon", value: "Bombon", province: "Camarines Sur" },
    { label: "Gainza", value: "Gainza", province: "Camarines Sur" },
    { label: "Milaor", value: "Milaor", province: "Camarines Sur" },
    { label: "Magarao", value: "Magarao", province: "Camarines Sur" },
    { label: "San Fernando", value: "San Fernando", province: "Camarines Sur" },
    { label: "Calabanga", value: "Calabanga", province: "Camarines Sur" },
    { label: "Other CamSur Municipality", value: "Other CamSur", province: "Camarines Sur" },
    { label: "Outside Camarines Sur", value: "Outside CamSur", province: "Outside Region V" },
  ];
  
  export const barangayOptions = [
    { label: "Select Barangay...", value: "" },
  
    // Barangays in Naga City
    { label: "Abella", value: "Abella", city: "Naga City" },
    { label: "Bagumbayan Norte", value: "Bagumbayan Norte", city: "Naga City" },
    { label: "Bagumbayan Sur", value: "Bagumbayan Sur", city: "Naga City" },
    { label: "Balatas", value: "Balatas", city: "Naga City" },
    { label: "Calauag", value: "Calauag", city: "Naga City" },
    { label: "Cararayan", value: "Cararayan", city: "Naga City" },
    { label: "Concepcion Grande", value: "Concepcion Grande", city: "Naga City" },
    { label: "Concepcion Pequeña", value: "Concepcion Pequeña", city: "Naga City" },
    { label: "Dayangdang", value: "Dayangdang", city: "Naga City" },
    { label: "Del Rosario", value: "Del Rosario", city: "Naga City" },
    { label: "Dinaga", value: "Dinaga", city: "Naga City" },
    { label: "Igualdad", value: "Igualdad", city: "Naga City" },
    { label: "Lerma", value: "Lerma", city: "Naga City" },
    { label: "Liboton", value: "Liboton", city: "Naga City" },
    { label: "Mabolo", value: "Mabolo", city: "Naga City" },
    { label: "Pacol", value: "Pacol", city: "Naga City" },
    { label: "Panganiban", value: "Panganiban", city: "Naga City" },
    { label: "Peñafrancia", value: "Peñafrancia", city: "Naga City" },
    { label: "Sabang", value: "Sabang", city: "Naga City" },
    { label: "San Felipe", value: "San Felipe", city: "Naga City" },
    { label: "San Francisco", value: "San Francisco", city: "Naga City" },
    { label: "San Isidro", value: "San Isidro", city: "Naga City" },
    { label: "Santa Cruz", value: "Santa Cruz", city: "Naga City" },
    { label: "Tabuco", value: "Tabuco", city: "Naga City" },
    { label: "Tinago", value: "Tinago", city: "Naga City" },
    { label: "Tobias", value: "Tobias", city: "Naga City" },
    { label: "Triangulo", value: "Triangulo", city: "Naga City" },
  
    { label: "Other Barangay in Naga", value: "Other Naga Barangay", city: "Naga City" },
    { label: "Outside Naga City", value: "Outside Naga", city: "Outside CamSur" },
  ];
  
  export const highestEducationOptions = [
    { label: "Master’s Degree", value: "masters" },
    { label: "Bachelor’s Degree / College Graduate", value: "college" },
    {
      label: "Undergraduate (Completed at least 2 years in college)",
      value: "undergrad",
    },
    { label: "Senior High School Graduate", value: "senior_high" },
    { label: "High School Graduate", value: "high_school" },
  ];
  export const eligibilityOptions = [
    { label: "LET (Licensure Exam for Teachers)", value: "let" },
    { label: "Civil Service Exam Passer", value: "civil_service" },
    { label: "TESDA NC II – ECCD", value: "tesda_eccd" },
    { label: "TESDA NC II – Caregiving", value: "tesda_caregiving" },
    { label: "Certificate in Early Childhood Education", value: "ece_cert" },
    { label: "Certificate of Daycare Training", value: "daycare_training" },
    { label: "NAPOLCOM Passer", value: "napolcom" },
    { label: "Criminologist Licensure Exam (CLE)", value: "crim_board" },
    { label: "Barangay Recommendation", value: "brgy_recommendation" },
    { label: "None", value: "none" },
    { label: "Others", value: "others" },
  ];
  export const monthlyIncomeOptions = [
    { label: "Below ₱5,000", value: "below_5000" },
    { label: "₱5,000 – ₱9,999", value: "5000_9999" },
    { label: "₱10,000 – ₱14,999", value: "10000_14999" },
    { label: "₱15,000 – ₱19,999", value: "15000_19999" },
    { label: "₱20,000 – ₱24,999", value: "20000_24999" },
    { label: "₱25,000 – ₱29,999", value: "25000_29999" },
    { label: "₱30,000 and above", value: "30000_above" },
    { label: "Prefer not to say", value: "prefer_not_say" },
  ];
  export const employmentTypeOptions = [
    { label: "Government", value: "government" },
    { label: "Private Sector", value: "private" },
    { label: "Self-Employed", value: "self_employed" },
    { label: "Non-Government Organization (NGO)", value: "ngo" },
    { label: "Barangay or LGU Appointed", value: "lgu" },
    { label: "Volunteer", value: "volunteer" },
    { label: "Unemployed", value: "unemployed" },
    { label: "Others (Specify)", value: "others" },
  ];
  export const employmentStatusOptions = [
    { label: "Regular / Permanent", value: "regular" },
    { label: "Contractual", value: "contractual" },
    { label: "Job Order (JO)", value: "job_order" },
    { label: "Casual", value: "casual" },
    { label: "Part-Time", value: "part_time" },
    { label: "Probationary", value: "probationary" },
    { label: "Volunteer", value: "volunteer" },
    { label: "Unemployed", value: "unemployed" },
  ];
  export const collegeDegreeOptions = [
    // Education-related
    { label: "Bachelor of Elementary Education (BEEd)", value: "beed" },
    { label: "Bachelor of Secondary Education (BSEd)", value: "bsed" },

    // Social Sciences & Humanities
    { label: "Bachelor of Arts in Political Science", value: "polsci" },
    { label: "Bachelor of Arts in Psychology", value: "psychology" },

    // Business & Management
    { label: "Bachelor of Science in Business Administration", value: "bsba" },
    { label: "Bachelor of Science in Accountancy", value: "accountancy" },
    { label: "Bachelor of Science in Marketing", value: "marketing" },
    {
      label: "Bachelor of Science in Management Accounting",
      value: "mgmt_accounting",
    },
    {
      label: "Bachelor of Science in Entrepreneurship",
      value: "entrepreneurship",
    },

    // Technology & Engineering
    { label: "Bachelor of Science in Information Technology", value: "it" },
    { label: "Bachelor of Science in Computer Science", value: "comsci" },
    { label: "Bachelor of Science in Computer Engineering", value: "comeng" },
    { label: "Bachelor of Science in Civil Engineering", value: "ce" },
    { label: "Bachelor of Science in Electrical Engineering", value: "ee" },
    { label: "Bachelor of Science in Mechanical Engineering", value: "me" },
    { label: "Bachelor of Science in Electronics Engineering", value: "ece" },
    { label: "Bachelor of Science in Architecture", value: "architecture" },

    // Health-related
    { label: "Bachelor of Science in Nursing", value: "nursing" },
    { label: "Bachelor of Science in Medical Technology", value: "medtech" },

    // Public Service & Law
    { label: "Bachelor of Science in Criminology", value: "criminology" },

    // Others
    { label: "Bachelor of Science in Agriculture", value: "agriculture" },
    { label: "Bachelor of Science in Tourism", value: "tourism" },
    {
      label: "Bachelor of Science in Hotel and Restaurant Management",
      value: "hrm",
    },

    // Misc
    { label: "Other (Specify)", value: "other" },
  ];
  export const educationCenterOptions = [
    { label: "Educare Center 1", value: "center1" },
    { label: "Educare Center 2", value: "center2" },
    { label: "Educare Center 3", value: "center3" },
    { label: "Educare Center 4", value: "center4" },
    { label: "Educare Center 5", value: "center5" },
  ];
  
  
  export const departmentOptions = [
    { label: "Education", value: "education" },
    { label: "Health Services", value: "health_services" },
    { label: "Social Services", value: "social_services" },
    { label: "Nutrition", value: "nutrition" },
    { label: "Child Development", value: "child_development" },
    { label: "Administration", value: "administration" },
    { label: "Community Outreach", value: "community_outreach" },
  ];
  