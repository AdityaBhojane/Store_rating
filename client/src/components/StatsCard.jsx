export const StatsCard = ({ icon, title, value, bgColor }) => {
    return (
        <div className={`p-6 rounded-lg shadow-md flex items-center space-x-4 ${bgColor}`}>
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};