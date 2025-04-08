'use client';
import Image from 'next/image';

interface Member {
  name: string;
  image: string;
  daily: { [key: string]: boolean };
}

interface ContributionsTableProps {
  members: Member[];
  setMembers: (data: Member[]) => void;
  disabled: boolean;
  currentMonth: string;
}

export default function ContributionsTable({ members, setMembers, disabled, currentMonth }: ContributionsTableProps) {
  const togglePayment = (memberIndex: number, day: number) => {
    if (disabled) return; // Prevent toggling if disabled

    const updatedMembers = [...members];
    const dateKey = `${currentMonth}-${day}`;

    // Toggle the value for the specific day
    updatedMembers[memberIndex].daily[dateKey] = !updatedMembers[memberIndex].daily[dateKey];

    // Update the parent state
    setMembers(updatedMembers);

    // Persist the updated state to localStorage
    localStorage.setItem('committee_members', JSON.stringify(updatedMembers));
  };

  const renderCheckboxes = (member: Member, memberIndex: number) => {
    const checkboxes = [];
    for (let day = 1; day <= 30; day++) {
      const dateKey = `${currentMonth}-${day}`;
      checkboxes.push(
        <td key={day} className="border px-2 py-1 text-center">
          <input
            type="checkbox"
            checked={!!member.daily[dateKey]} // Ensure the value is saved correctly
            onChange={() => togglePayment(memberIndex, day)}
            className="w-5 h-5 accent-purple-600"
            disabled={disabled}
          />
        </td>
      );
    }
    return checkboxes;
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">📊 Contributions Tracker</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-purple-400 bg-white">
        <table className="min-w-full text-sm text-left text-blue-950">
          <thead className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white text-center">
            <tr>
              <th className="px-4 py-3 text-sm">Member</th>
              {Array.from(Array(30).keys()).map((day) => (
                <th key={day} className="px-2 py-2 text-xs font-semibold">
                  {day + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="even:bg-purple-50">
                <td className="border px-4 py-2 font-medium">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={member.image}
                      alt="profile"
                      width={28}
                      height={28}
                      className="rounded-full border border-gray-300"
                    />
                    <span>{member.name}</span>
                  </div>
                </td>
                {renderCheckboxes(member, index)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}