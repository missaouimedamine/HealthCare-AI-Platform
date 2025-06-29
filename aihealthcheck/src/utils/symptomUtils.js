export function getIconForBodyPart(part) {
  const iconMap = {
    head: 'fa-head-side-virus',
    neck: 'fa-user-neck',
    chest: 'fa-heart-pulse',
    arms: 'fa-arm',
    abdomen: 'fa-stomach',
    pelvis: 'fa-person-dress',
    back: 'fa-spine',
    buttocks: 'fa-body',
    legs: 'fa-leg'
  };

  const lowerPart = part.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerPart.includes(key)) {
      return icon;
    }
  }
  return 'fa-question-circle';
}

export function transformSymptoms(jsonData) {
  const symptoms = [];
  let idCounter = 1;

  for (const [mainPart, subParts] of Object.entries(jsonData)) {
    if (Array.isArray(subParts)) {
      subParts.forEach(symptomName => {
        symptoms.push({
          id: idCounter++,
          name: symptomName,
          category: mainPart.toLowerCase().replace(/\s+/g, '-'),
          subCategory: null,
          icon: getIconForBodyPart(mainPart)
        });
      });
    } else {
      for (const [subPart, symptomList] of Object.entries(subParts)) {
        symptomList.forEach(symptomName => {
          symptoms.push({
            id: idCounter++,
            name: symptomName,
            category: mainPart.toLowerCase().replace(/\s+/g, '-'),
            subCategory: subPart.toLowerCase().replace(/\s+/g, '-'),
            icon: getIconForBodyPart(subPart)
          });
        });
      }
    }
  }

  return symptoms;
}