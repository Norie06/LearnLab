function LectureFinalResults({ results }) {
  return (
    <div className="lecture-final-results">
      <h2>Final Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.name}: {result.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LectureFinalResults;