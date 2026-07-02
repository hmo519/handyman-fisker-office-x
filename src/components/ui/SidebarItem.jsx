function SidebarItem({
  icon,
  label,
  active,
  onClick,
  collapsed = false,
}) {
  return (
    <button
      className={`sidebarItem ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="sidebarIcon">{icon}</span>

      {!collapsed && (
        <span className="sidebarLabel">
          {label}
        </span>
      )}
    </button>
  );
}

export default SidebarItem;
