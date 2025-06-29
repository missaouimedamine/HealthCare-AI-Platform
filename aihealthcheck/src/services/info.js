
export const getDiseaseInfo = async (disease) => {
  try {
    const response = await fetch(`http://localhost:8000/api/infos/infos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({disease_name: disease,}),
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