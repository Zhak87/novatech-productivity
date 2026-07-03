// Круглый аватар с рамкой-индикатором ранга и короной/медалью для топ-3.
export default function Avatar({ employee, size = 44, rank }) {
  const ring = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'none';
  return (
    <div className="avatar-wrap" style={{ width: size, height: size }}>
      {rank === 1 && <span className="crown">👑</span>}
      {rank === 2 && <span className="medal">🥈</span>}
      {rank === 3 && <span className="medal">🥉</span>}
      <span className={`ring ${ring}`}>
        <img
          className="avatar"
          src={employee.avatar_url}
          alt={employee.full_name}
          width={size}
          height={size}
        />
      </span>
    </div>
  );
}
