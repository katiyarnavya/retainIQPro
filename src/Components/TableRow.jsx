import React, { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai"; // Importing the plus and edit icons

const TableRow = ({ index, handleRemoveRow }) => {
  const [variants, setVariants] = useState([
    { id: 1, image: null, text: "Variant 1" },
    { id: 2, image: null, text: "Variant 2" },
    { id: 3, image: null, text: "Variant 3" },
  ]);

  const fileInputRefs = useRef([]);

  const handleImageUpload = (e, variantIndex) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newVariants = [...variants];
      newVariants[variantIndex].image = reader.result;
      setVariants(newVariants);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e, variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].text = e.target.value;
    setVariants(newVariants);
  };

  const handleFileInputClick = (variantIndex) => {
    fileInputRefs.current[variantIndex].click();
  };

  const handleAddVariant = () => {
    const newVariantIndex = variants.length + 1; // Incrementing index for new variant
    const newVariant = { id: newVariantIndex, image: null, text: `Variant ${newVariantIndex}` };
    setVariants([...variants, newVariant]); // Adding the new variant to the state
    fileInputRefs.current[newVariantIndex - 1] = React.createRef(); // Create a new ref for the file input
  };

  return (
    <tr className="table-row">
      <td className="row-index">{index + 1}</td>
      <td className="filter-column">
        <span>Product Collection: Anarkali Kurtas</span>
      </td>
      <td className="variants">
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="variant">
            <div className="uploaded-image-container">
              {variant.image ? (
                <>
                  <img
                    src={variant.image}
                    alt={`Variant ${variantIndex + 1}`}
                    className="variant-image"
                  />
                  <span
                    onClick={() => handleFileInputClick(variantIndex)}
                    className="edit-icon"
                  >
                    <AiOutlineEdit size={20} />
                  </span>
                </>
              ) : (
                <span onClick={() => handleFileInputClick(variantIndex)} className="upload-icon">
                  <AiOutlinePlus size={20} />
                  <span style={{ margin: "8px" }}>Add Design</span>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, variantIndex)}
                ref={(el) => (fileInputRefs.current[variantIndex] = el)}
                style={{ display: "none" }} // Hide the file input
              />
              {variant.image && <span>{variant.text}</span>}
            </div>
          </div>
        ))}
      </td>
      <td className="variant-buttons">
        <button onClick={handleAddVariant}>Add Variant</button>
        <button onClick={() => handleRemoveRow(index)}>Delete Row</button>
      </td>
    </tr>
  );
};

export default TableRow;
