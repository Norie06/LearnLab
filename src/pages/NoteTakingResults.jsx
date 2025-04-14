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
import "./TestResults.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

function NoteTakingResults() {
  const location = useLocation();
  const [markdownContents, setMarkdownContents] = useState([]); // Array to store Markdown content
  const [chartData, setChartData] = useState(null); // State for chart data
  

  const evaluateAnswers = (answers) => {
    if (!answers || Object.keys(answers).length === 0) {
      console.error("No answers provided for evaluation.");
      return { sortedStyles: [], counts: { cornell: 0, mind_maps: 0, sketchnotes: 0, outline: 0 } };
    }

    const counts = { cornell: 0, mind_maps: 0, sketchnotes: 0, outline: 0 };

    Object.values(answers).forEach((answerIndex) => {
      if (answerIndex === 0) counts.outline++;
      else if (answerIndex === 1) counts.mind_maps++;
      else if (answerIndex === 2) counts.sketchnotes++;
      else if (answerIndex === 3) counts.cornell++;
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
      cornell: "Cornell Notes",
      mind_maps: "Mind Maps",
      sketchnotes: "Sketchnotes",
      outline: "Outline Method",
    };

    const fetchMarkdownFiles = async () => {
      try {
        const markdownPromises = sortedStyles.map(async (style) => {
          const response = await fetch(`/content/test-results/note-taking/${style}.md`);
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
        labels: ["Cornell", "Mind Maps", "Sketchnotes", "Outline"],
        datasets: [
          {
            label: "Note Taking Scores",
            data: [
              counts.cornell,
              counts.mind_maps,
              counts.sketchnotes,
              counts.outline,
            ],
            backgroundColor: [
              "rgba(27, 99, 151, 0.8)", // Visual
              "rgba(241, 124, 116, 0.8)", // Kinesthetic
              "rgba(108, 180, 98, 0.8)", // Auditory
              "rgba(205, 200, 50, 0.8)", // Reading
            ],
            borderColor: [
              "rgba(27, 99, 151, 1)", // Visual
              "rgba(241, 124, 116, 1)", // Kinesthetic
              "rgba(108, 180, 98, 1)", // Auditory
              "rgba(205, 200, 50, 1)", // Reading
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [sortedStyles, counts]);

  return (
    <div id="note-taking_results" className="page results-page">
      <header className="hero">
        <h1>Note-Taking Test Results</h1>
      </header>
      <main>
        <h2>Understanding Note-Taking Style</h2>
        <p style={{textAlign: "justify"}}>
          Many people have a mix of note-taking styles! Use this quiz to identify
          your strengths and combine techniques for a more effective study
          experience. Try incorporating strategies from other note-taking styles to
          see what works best for you. For more tips and tools tailored to your
          note-taking style, visit the LearnLab{" "}
          <a href="/resource-hub">Resource Hub</a>.
        </p>
        <div className="container">
          {sortedStyles.length === 0 ? (
            <p>No results available. Please complete the quiz first.</p>
          ) : (
            <div className="content">
              <div className="chart-and-list">
                <div className="results-list">
                  <h2>Your Note-Taking Style Is:</h2>
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

                return (
                  <div key={index} className="markdown-section">
                    <div className="markdown-content">
                      <h1>
                        {markdown.title} ({percentage}%)
                      </h1>
                      <ReactMarkdown>{markdown.content}</ReactMarkdown>
                    </div>
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

export default NoteTakingResults;