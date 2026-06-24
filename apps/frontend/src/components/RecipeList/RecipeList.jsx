import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes = [], type, onRemove }) => {
  return (
    <div className={styles.container}>
      {recipes.length === 0 && <p>No recipes found.</p>}
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          type={type}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default RecipeList;
