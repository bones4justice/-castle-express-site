import { useState } from "react";
import { SERVICE_AREAS } from "@/content";

const towns = [...new Set(Object.values(SERVICE_AREAS).flat())];

export default function EstimateTownInput({ id, label, icon, value, onChange, onNext, error, ...props }) {
  const [editing, setEditing] = useState(false);
  const [focused, setFocused] = useState(false);
  const prefix = value.trim().toLowerCase();
  const suggestions = editing && prefix.length >= 2
    ? towns.filter((town) => town.toLowerCase().startsWith(prefix) && town.toLowerCase() !== prefix).slice(0, 4)
    : [];

  return (
    <div className="isf-field" onFocus={() => setFocused(true)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
    }}>
      <label htmlFor={id}>{label}</label>
      <div className="isf-input-wrap">
        <span className="isf-input-ico" aria-hidden="true">{icon}</span>
        <input {...props} id={id} value={value} maxLength={100}
          autoComplete="address-level2" autoCorrect="off" autoCapitalize="words" spellCheck={false} enterKeyHint="next"
          aria-invalid={Boolean(error)} aria-describedby={error ? id + "-error" : undefined}
          onChange={(event) => { onChange(event.target.value); setEditing(true); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setEditing(false);
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              setEditing(false);
              onNext();
            }
          }}
        />
      </div>
      {error && <p className="isf-err" id={id + "-error"}>{error}</p>}
      {suggestions.length > 0 && (
        <div className="isf-town-suggestions" aria-label="Nearby towns" role="group" style={{ visibility: focused ? "visible" : "hidden" }}>
          {suggestions.map((town) => (
            <button type="button" key={town}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(town);
                document.getElementById(id)?.focus({ preventScroll: true });
                setEditing(false);
              }}>{town}</button>
          ))}
        </div>
      )}
    </div>
  );
}
