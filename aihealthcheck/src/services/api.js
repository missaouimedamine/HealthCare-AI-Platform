const API_BASE_URL = 'http://localhost:8000'; // Update with your backend URL

export const analyzeSymptoms = async (symptoms, conditions,age,gender) => {
  try {
    let pipeline;
    if (conditions.length !== 0){
      pipeline = "I'm " + gender + " and I have " + age + " years old. I have as symptoms " + symptoms.join(", ") + " and I have " + conditions.join(", ") + ".";
    } else {
      pipeline = "I'm " + gender + " and I have " + age + " years old. I have as symptoms " + symptoms.join(", ") + ".";
    }

    const response = await fetch(`${API_BASE_URL}/api/analysis/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms: pipeline,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
};