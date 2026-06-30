const websiteData = {
    // The core details
    title: "1805",
    startDate: "2025-11-30T00:00:00", // Fresh, accurate start date

    // Profile Birthdays
    hisBirthday: "2007-03-18T00:00:00",
    herBirthday: "2007-05-18T00:00:00", // Placeholder, change anytime!

    // Main Page Content
    heroTitle: "7 MONTHS",
    togetherSinceText: "Together Since 2025",
    synopsis: "It took just 7 months for our story to feel like a lifetime. From late-night laughs to quiet moments, there's no one else I'd rather share my days with. A kiss from you or even just your smile can turn any day into magic. I'd choose you in every universe, every time. I love you with all my heart...",
    
    // Media Links (Using placeholder links for now, swap out with your Catbox URLs later!)
    mainHeroImage: "RUIDdb36c7ecf2214bb2993735b7dc095e92(1).jpg",

    // Interactive Moments Rows
    moments: [
        { title: "His Birthday", type: "countdown", date: "2007-03-18" },
        { title: "Her Birthday", type: "countdown", date: "2007-05-18" },
        { title: "Since We Started", type: "countup", date: "2025-11-30" }
    ]
};

// This makes the data available to our main website file
window.websiteData = websiteData;
