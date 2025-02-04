// FeedbackSystem.tsx
import React, { useState } from "react";

const FeedbackSystem: React.FC = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    alert(`Feedback enviado: ${feedback}`);
    setFeedback("");
  };

  return (
    <div>
      <h3>Envie seu Feedback</h3>
      <textarea 
        value={feedback} 
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Digite seu feedback aqui..."
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default FeedbackSystem;
