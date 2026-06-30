const websiteData = {
    // The core details
    title: "1805",
    startDate: "2024-11-30T00:00:00", // Your relationship start date

    // Profile Birthdays
    hisBirthday: "2007-03-18T00:00:00",
    herBirthday: "2007-05-18T00:00:00", // Placeholding a date for now, change it anytime!

    // Main Page Content
    heroTitle: "1 YEAR",
    togetherSinceText: "Together Since 2024",
    synopsis: "It took just 1 year for our story to feel like a lifetime. From late-night laughs to quiet moments, there's no one else I'd rather share my days with. A kiss from you or even just your smile can turn any day into magic. I'd choose you in every universe, every time. I love you with all my heart...",
    
    // Media Links (Using placeholder links for now, swap out with your Catbox URLs later!)
    mainHeroImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200",

    // Interactive Moments Rows
    moments: [
        { title: "His Birthday", type: "countdown", date: "2007-03-18" },
        { title: "Her Birthday", type: "countdown", date: "2007-05-18" },
        { title: "Since We Started", type: "countup", date: "2024-11-30" }
    ]
};

// This makes the data available to our main website file
window.websiteData = websiteData;

