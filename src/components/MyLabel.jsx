export function MyLabel({text, fontSize = 15}) {
    return (
        <label style={{fontWeight: 600, color:'#777373', fontSize}}>{text}</label>
    );
}