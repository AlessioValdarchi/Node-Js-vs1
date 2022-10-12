-- CreateTable
CREATE TABLE "serieA" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "point" INTEGER NOT NULL,
    "goalScored" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serieA_pkey" PRIMARY KEY ("id")
);
