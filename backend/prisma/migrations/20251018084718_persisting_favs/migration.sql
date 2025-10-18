-- CreateTable
CREATE TABLE "Favorite" (
    "imdbID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "Poster" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("imdbID")
);
