import { GenericButton } from '../../common/buttons';

interface Props {
  matchers: string[];
  handleAddMatcher: (matcher: string) => void;
  handleDeleteMatcher: (id: number) => void;
  handleUpdateMatcher: (id: number, value: string) => void;
}

function MatchersInput({
  matchers,
  handleAddMatcher,
  handleDeleteMatcher,
  handleUpdateMatcher,
} : Props) {
  return (
    <div>
      {matchers.map((str, index) => (
        <div key={index} className="flex items-center mb-2">
          <textarea
            value={str}
            onChange={(e) => {
              e.preventDefault();
              handleUpdateMatcher(index, e.target.value);
            }}
            className="border rounded w-full py-2 px-3 mr-2"
            placeholder="Enter a string"
            rows={1}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteMatcher(index);
            }}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <span role='img' aria-label='bin'>🗑️</span>
          </button>
        </div>
      ))}

      <div className="flex justify-center">
        <GenericButton
          text="+"
          onClick={(e) => {
            e.preventDefault();
            handleAddMatcher('');
          }}
        />
      </div>
    </div>
  );
}

export default MatchersInput;