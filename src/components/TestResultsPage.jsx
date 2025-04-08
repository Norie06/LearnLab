import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../App.css";
import "./LearningStylesResults.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

function LearningStylesResults() {
  const location = useLocation();
  const [markdownContents, setMarkdownContents] = useState([]); // Array to store Markdown content
  const [chartData, setChartData] = useState(null); // State for chart data
  

  const evaluateAnswers = (answers) => {
    if (!answers || Object.keys(answers).length === 0) {
      console.error("No answers provided for evaluation.");
      return { sortedStyles: [], counts: { visual: 0, auditory: 0, kinesthetic: 0, reading: 0 } };
    }

    const counts = { visual: 0, auditory: 0, kinesthetic: 0, reading: 0 };

    Object.values(answers).forEach((answerIndex) => {
      if (answerIndex === 0) counts.visual++;
      else if (answerIndex === 1) counts.auditory++;
      else if (answerIndex === 2) counts.reading++;
      else if (answerIndex === 3) counts.kinesthetic++;
    });

    // Sort learning styles by their scores in descending order
    const sortedStyles = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    return { sortedStyles, counts };
  };

  const { sortedStyles, counts } = React.useMemo(() => {
    const selectedAnswers = location.state || {}; // Move inside useMemo
    return evaluateAnswers(selectedAnswers);
  }, [location.state]);


  useEffect(() => {
    if (sortedStyles.length === 0) return; // Skip fetching if no styles are available
    const titles = {
      visual: "Visual",
      auditory: "Aural (Auditory)",
      reading: "Reading/Writing",
      kinesthetic: "Kinesthetic",
    };

    const fetchMarkdownFiles = async () => {
      try {
        const markdownPromises = sortedStyles.map(async (style) => {
          const response = await fetch(`/content/test-results/learning-styles/${style}_learner.md`);
          const text = await response.text();
          return { style, content: text, title: titles[style] }; // Return both the style and its content
        });

        const markdowns = await Promise.all(markdownPromises);
        setMarkdownContents(markdowns); // Store all Markdown content in state
      } catch (error) {
        console.error("Error fetching Markdown files:", error);
      }
    };

    fetchMarkdownFiles();

    // Prepare chart data
    if (counts) {
      setChartData({
        labels: ["Visual", "Aural", "Reading", "Kinesthetic"],
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
              "rgba(27, 99, 151, 0.8)", // Visual
              "rgba(108, 180, 98, 0.8)", // Auditory
              "rgba(205, 200, 50, 0.8)", // Reading
              "rgba(241, 124, 116, 0.8)", // Kinesthetic
            ],
            borderColor: [
              "rgba(27, 99, 151, 1)", // Visual
              "rgba(108, 180, 98, 1)", // Auditory
              "rgba(205, 200, 50, 1)", // Reading
              "rgba(241, 124, 116, 1)", // Kinesthetic
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [sortedStyles, counts]);

  return (
    <div id="learning_styles_results" className="page">
      <header className="hero">
        <h1>Learning Styles Test Results</h1>
      </header>
      <main>
        <h2>Understanding Your Learning Style</h2>
        <p style={{textAlign: "justify"}}>
          Many people have a mix of learning styles! Use this quiz to identify
          your strengths and combine techniques for a more effective study
          experience. Try incorporating strategies from other learning styles to
          see what works best for you. For more tips and tools tailored to your
          learning style, visit the LearnLab{" "}
          <a href="/resource-hub">Resource Hub</a>.
        </p>
        <div className="container">
          {sortedStyles.length === 0 ? (
            <p>No results available. Please complete the quiz first.</p>
          ) : (
            <div className="content">
              <div className="chart-and-list">
                <div className="learning-styles-list">
                  <h2>Your Learning Style Is:</h2>
                  <ul>
                    {sortedStyles.map((style) => {
                      const totalScore = Object.values(counts).reduce((sum, value) => sum + value, 0);
                      const percentage = ((counts[style]/totalScore) * 100).toFixed(0);
                      return (
                        <li key={style} className={style}>
                          {percentage+ "% " + style.charAt(0).toUpperCase() + style.slice(1)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {chartData && (
                  <div className="chart-container">
                    <Doughnut
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: false,
                          },
                          datalabels: {
                            color: "#000000",
                            font: {
                              size: 14,
                              weight: "bold",
                            },
                            formatter: (value, context) => {
                              const total = context.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${context.chart.data.labels[context.dataIndex]} - ${percentage}%`;
                            },
                          },
                        },
                      }}
                    />
                  </div>
              )}
              </div>
              {markdownContents.map((markdown, index) => {
                const totalScore = Object.values(counts).reduce((sum, value) => sum + value, 0);
                const percentage = ((counts[markdown.style] / totalScore) * 100).toFixed(0);
                const imageSrc = `/images/${markdown.style}.svg`;

                return (
                  <div key={index} className="markdown-section">
                    <div className="markdown-content">
                      <h1>
                        {markdown.title} Learner ({percentage}%)
                      </h1>
                      <ReactMarkdown>{markdown.content}</ReactMarkdown>
                    </div>
                    <img src={imageSrc} alt={`${markdown.title} illustration`} className="style-image" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default LearningStylesResults;