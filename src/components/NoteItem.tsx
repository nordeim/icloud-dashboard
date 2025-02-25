import { motion } from 'framer-motion';
import { Note } from '../services/noteService';

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, isSelected, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg border ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:bg-gray-50'
      } cursor-pointer`}
      onClick={onClick}
    >
      <p className="text-gray-900 line-clamp-2">{note.content}</p>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(note.modifiedAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default NoteItem; 