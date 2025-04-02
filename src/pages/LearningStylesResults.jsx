import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LearningStylesResults() {
  const location = useLocation();
  const { selectedAnswers } = location.state || {}; // Extract selectedAnswers from state
  console.log("Received Selected Answers in Results:", selectedAnswers); // Debug log
  const [markdownContent, setMarkdownContent] = useState("");
  const [chartData, setChartData] = useState(null); // State for chart data

  const evaluateAnswers = (answers) => {
    if (!answers || Object.keys(answers).length === 0) {
      console.error("No answers provided for evaluation.");
      return { learningStyle: "unknown", counts: null }; // Return default values if answers are missing
    }

    const counts = { visual: 0, auditory: 0, kinesthetic: 0, reading: 0 };

    Object.values(answers).forEach((answerIndex) => {
      if (answerIndex === 0) counts.visual++;
      else if (answerIndex === 1) counts.auditory++;
      else if (answerIndex === 2) counts.reading++;
      else if (answerIndex === 3) counts.kinesthetic++;
    });

    const maxStyle = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return { learningStyle: maxStyle, counts };
  };

  const { learningStyle, counts } = evaluateAnswers(selectedAnswers);

  useEffect(() => {
    if (learningStyle === "unknown") return; // Skip fetching if learningStyle is unknown

    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          `/content/test-results/learning-styles/${learningStyle}_learner.md`
        );
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error("Error fetching Markdown file:", error);
      }
    };

    fetchMarkdown();

    // Prepare chart data
    if (counts) {
      setChartData({
        labels: ["Visual", "Auditory", "Reading", "Kinesthetic"],
        datasets: [
          {
            label: "Learning Style Scores",
            data: [
              counts.visual,
              counts.auditory,
              counts.reading,
              counts.kinesthetic,
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 205, 86, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 205, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [learningStyle, counts]);

  return (
    <div id="learning_styles_results" className="page">
      <header className="hero">
        <h1>Learning Styles Test Results</h1>
      </header>
      <h2>Understanding Your Learning Style</h2>
      <p>
        Many people have a mix of learning styles! Use this quiz to identify
        your strengths and combine techniques for a more effective study
        experience. Try incorporating strategies from other learning styles to
        see what works best for you. For more tips and tools tailored to your
        learning style, visit the LearnLab{" "}
        <a href="/resource-hub">Resource Hub</a>.
      </p>
      <div>
        {learningStyle === "unknown" ? (
          <p>No results available. Please complete the quiz first.</p>
        ) : (
          <>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
            {chartData && (
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Learning Style Scores",
                      },
                    },
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LearningStylesResults;