-- CreateTable
CREATE TABLE "_FleetToMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FleetToMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FleetToMember_B_index" ON "_FleetToMember"("B");

-- AddForeignKey
ALTER TABLE "_FleetToMember" ADD CONSTRAINT "_FleetToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Fleet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FleetToMember" ADD CONSTRAINT "_FleetToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
