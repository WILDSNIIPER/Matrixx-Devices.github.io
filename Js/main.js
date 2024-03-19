function write(element, text, index, callback) {
  if (!element || !text) {
    console.error("Missing required parameters");
    return;
  }

  if (index < text.length) {
    setTimeout(() => {
      index++;
      element.innerHTML = text.substr(0, index) + '<em aria-hidden="true"></em>';
      write(element, text, index, callback);
    }, 50);
  } else {
    callback();
  }
}

function erase(element, callback, index) {
  if (!element) {
    console.error("Missing required parameters");
    return;
  }

  const text = element.innerText;

  if (text.length > 0) {
    setTimeout(() => {
      element.innerText = text.substr(0, text.length - 1);
      erase(element, callback, index);
    }, 10 / (index * (index / 10000000)));
  } else {
    element.innerText = " ";
    callback();
  }
}

const typeline = document.querySelector("#typeline");

if (!typeline) {
  console.error("Could not find element with ID 'typeline'");
  return;
}

function writeErase(element, text, delay, callback) {
  write(element, text, 0, () => {
    setTimeout(() => {
      erase(element, callback);
    }, delay);
  });
}

const sentences = [
  "is a custom ROM. ",
  "is based on cr
