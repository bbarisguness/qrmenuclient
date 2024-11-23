async function getTcmb() {
  const response = await fetch("https://tcmb.gov.tr/kurlar/today.xml");
  const text = await response.text();
  return text
}

export { getTcmb };
