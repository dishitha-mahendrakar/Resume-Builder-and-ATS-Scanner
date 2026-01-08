// client/src/pages/score.js

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

async function Score() {
  let suggestions = [];
  let positives = [];
  let score = 0;

  try {
    // ✅ use API_BASE (so it works on any port/env)
    const response = await fetch(`${API_BASE}/result`);
    const data = await response.json();

    if (data.objective) {
      score += 10;
      positives.push("✔ Objective is included");
    } else {
      suggestions.push("Write an objective");
    }

    if (data.skills) {
      score += 10;
      positives.push("✔ Skills are well mentioned");
    } else {
      suggestions.push("Write some skills");
    }

    if (
      data.courses ||
      data.certifications ||
      data.certification ||
      data.certificates
    ) {
      score += 5;
      positives.push("✔ Certifications/Courses are included");
    } else {
      suggestions.push("Mention some courses or certifications");
    }

    if (data.projects) {
      score += 20;
      positives.push("✔ Projects are listed");
    } else {
      suggestions.push("Mention some projects");
    }

    if (data.experience || data.workexperience) {
      score += 30;
      positives.push("✔ Work experience is provided");
    } else {
      suggestions.push("Write some experiences");
    }

    if (
      data.interests ||
      data.achievements ||
      data.achievement ||
      data["co-curricular"] ||
      data.hobbies ||
      data.activities
    ) {
      score += 5;
      positives.push("✔ Interests/Co-curricular activities are included");
    } else {
      suggestions.push(
        "Write some interests/achievements/co-curricular/hobbies/activities"
      );
    }

    if (data.education || data.Education) {
      score += 5;
      positives.push("✔ Education details are mentioned");
    } else {
      suggestions.push("Mention your education background");
    }

    if (data.email) {
      score += 5;
      positives.push("✔ Email is included");
    } else {
      suggestions.push("Provide an e-mail");
    }

    const hasLinkedIn =
      (data.profiles &&
        String(data.profiles).toLowerCase().includes("linkedin.com")) ||
      (data.profile &&
        String(data.profile).toLowerCase().includes("linkedin.com")) ||
      (data.links && String(data.links).toLowerCase().includes("linkedin.com")) ||
      (data.contacts &&
        String(data.contacts).toLowerCase().includes("linkedin.com"));

    if (hasLinkedIn) {
      score += 15;
      positives.push("✔ LinkedIn/profile link is added");
    } else {
      suggestions.push("Mention any profile (LinkedIn Recommended)");
    }

    score = Math.floor((score / 105) * 100);

    return { score, positives, suggestions };
  } catch (error) {
    console.error("Score() error:", error);
    return { score: 0, positives: [], suggestions: ["Error fetching data"] };
  }
}

export default Score;
