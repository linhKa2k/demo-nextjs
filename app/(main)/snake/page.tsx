"use client";

import { useState, useEffect, useCallback } from "react";

// Types
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bitePosition, setBitePosition] = useState<Position | null>(null);
  const [biteAnimation, setBiteAnimation] = useState(false);

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );
    
    return isOnSnake ? generateFood() : newFood;
  }, [snake]);

  const handleSnakeBite = useCallback((head: Position, currentSnake: Position[]) => {
    const collisionIndex = currentSnake.findIndex(
      (segment, index) => index > 0 && segment.x === head.x && segment.y === head.y
    );

    if (collisionIndex !== -1) {
      setBitePosition({ x: head.x, y: head.y });
      setBiteAnimation(true);
      setTimeout(() => setBiteAnimation(false), 300);

      const segmentsToRemove = currentSnake.length - collisionIndex;
      const pointsLost = segmentsToRemove * 5;
      
      setScore(prev => Math.max(0, prev - pointsLost));
      
      return currentSnake.slice(0, collisionIndex);
    }

    return currentSnake;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      let newSnake = [head, ...prevSnake];

      newSnake = handleSnakeBite(head, newSnake);

      if (head.x === food.x && head.y === food.y) {
        const newFood = generateFood();
        setFood(newFood);
        setScore(prev => prev + 10);
        
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood, handleSnakeBite]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          setIsPaused(prev => !prev);
          break;
        case "r":
          if (gameOver) resetGame();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameOver, isPaused]);

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
    
    setIsPaused(false);
    setBitePosition(null);
    setBiteAnimation(false);
  };

  useEffect(() => {
    const initialFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    
    if (initialFood.x === 10 && initialFood.y === 10) {
      initialFood.x = 5;
      initialFood.y = 5;
    }
    
    setFood(initialFood);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🐍 Rắn săn mồi</h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Điểm: {score}</span>
            <span className="text-sm text-gray-500">Dài: {snake.length}</span>
            {isPaused && (
              <span className="text-yellow-600 font-semibold">⏸️ Tạm dừng</span>
            )}
          </div>
        </div>

        <div 
          className="bg-gray-800 rounded-lg mx-auto mb-6 relative"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE 
          }}
        >
          <div
            className="absolute bg-red-500 rounded-full animate-pulse"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
            }}
          />

          {bitePosition && (
            <div
              className={`absolute bg-red-600 rounded-full ${
                biteAnimation ? "animate-ping" : ""
              }`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: bitePosition.x * CELL_SIZE,
                top: bitePosition.y * CELL_SIZE,
              }}
            />
          )}

          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded transition-all duration-100 ${
                index === 0 
                  ? "bg-green-600"
                  : "bg-green-400"
              }`}
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
              }}
            />
          ))}

          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
              <div className="text-center text-white p-4">
                <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
                <p className="mb-2">Điểm số: {score}</p>
                <p className="mb-4">Độ dài: {snake.length}</p>
                <button
                  onClick={resetGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Chơi lại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}