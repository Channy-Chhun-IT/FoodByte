import { useState, useEffect } from "react";

export const useTypingAnimation = (text: string, speed: number = 150) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let ticker: NodeJS.Timeout;

    const handleTyping = () => {
      const fullText = text || "Welcome!";
      const updatedText = isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        // Pause at end
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    ticker = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(ticker);
  }, [displayText, isDeleting, text, speed, loopNum]);

  return displayText;
};
