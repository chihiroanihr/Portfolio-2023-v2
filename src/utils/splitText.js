// Reference:
// https://webanimation.blog/blog/wavy-text-animation-using-react-hooks-with-gsap-v3

// ---------------- Split Text To Chars Function ---------------- //
export const splitTextToChars = (textNode, style = null) => {
  // Obtain and Split texts
  const textContent = textNode.textContent;
  const textSplit = textContent.split("");

  // Create new doc fragment
  const frag = document.createDocumentFragment();
  // Append each chars to doc fragment
  textSplit.map((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style = `${style} 
    ${letter === " " ? "min-width: 1rem;" : ""}
    z-index: ${textSplit.length - i}; 
    position: relative; display: inline-block;`;

    frag.appendChild(span);
  });

  // Removes the original text from the node
  textNode.textContent = "";

  // Appends the document fragment with chars
  textNode.appendChild(frag);

  // Returns its children, which are the individual <span> elements for each chars
  return textNode.children;
};

// ---------------- Split Text To Words Function ---------------- //
export const splitTextToWords = (textNode, style = null) => {
  // Obtain and Split texts
  const textContent = textNode.textContent;
  const wordSplit = textContent.split(" ");

  // Create new doc fragment
  const frag = document.createDocumentFragment();

  // Append each words to doc fragment
  wordSplit.map((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style = `${style} 
    z-index: ${wordSplit.length - i}; 
    position: relative; 
    display: inline-block;`;

    frag.appendChild(span);

    // If not last word in the array, add space to the fragment
    if (i < wordSplit.length - 1) {
      frag.appendChild(document.createTextNode(" "));
    }
  });

  // Removes the original text from the node
  textNode.textContent = "";

  // Appends the document fragment with words
  textNode.appendChild(frag);

  // Returns its children, which are the individual <span> elements for each words
  return textNode.children;
};
