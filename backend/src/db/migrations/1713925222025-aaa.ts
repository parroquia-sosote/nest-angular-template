import { MigrationInterface, QueryRunner } from 'typeorm';

export class Aaa1713925222025 implements MigrationInterface {
  name = 'Aaa1713925222025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_number" character varying(10) NOT NULL, "full_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(150), "is_password_reset" boolean NOT NULL DEFAULT false, "signature" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "role" character varying(50) NOT NULL DEFAULT 'user', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "phone" character varying(100) NOT NULL DEFAULT '', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth"."user"`);
  }
}
