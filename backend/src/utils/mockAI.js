
exports.generateHealthResult = (data) => {
    let score = 0;

    if(data.sleep >= 4) score += 30;
    if(data.stress === "Low") score += 30;
    if(data.activity === "Active") score += 40;

    return {
        score,
        status : score > 70 ? "Healthy" : "Needs Attention",
        recommendation : 
              score > 70 ? "Great job! Maintain your healthy routine."
              : "Improve sleep, reduce stress, and stay active."
    };
};



