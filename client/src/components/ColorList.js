import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  console.log(colorToAdd);
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    e.preventDefault();
    console.log(`add`);
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(res => updateColors(res.data))
      .catch(error => console.log(error));

    setColorToAdd(initialColor);
  };

  const changeColors = color => {
    return colors.map(col => {
      if (col.id === color.id) {
        col.color = color.color;
        col.code.hex = color.code.hex;
        return col;
      }
      return col;
    });
  };

  const deleteColorHandler = id => {
    return colors.filter(col => col.id !== id);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => changeColors(res.data))
      .then(arr => updateColors(arr))
      .catch(error => console.log(error));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    setColorToEdit(initialColor);
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => deleteColorHandler(res.data))
      .then(arr => updateColors(arr));
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={addColor}>
        <legend>Add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
        </div>
      </form>

    </div>
  );
};

export default ColorList;