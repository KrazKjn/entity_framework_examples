import React, { useState } from "react";

function SaveEntityForm({ entityType, onSubmitSuccess }) {
    const [entityName, setEntityName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        try {
            setIsSaving(true);

            // Simulate save operation
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Call the provided onSubmitSuccess function
            if (typeof onSubmitSuccess === "function") {
                onSubmitSuccess(entityType, entityName);
            }

            // Reset form
            setEntityName("");
        } catch (error) {
            console.error(`Failed to save ${entityType}:`, error);
            alert(`An error occurred while saving the ${entityType}.`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <h1>Save {entityType}</h1>
            <input
                type="text"
                placeholder={`${entityType} Name`}
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
            />
            <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : `Save ${entityType}`}
            </button>
        </div>
    );
}

// Example usage:
// <SaveEntityForm entityType="Employee" />
// <SaveEntityForm entityType="Department" />

export default SaveEntityForm;