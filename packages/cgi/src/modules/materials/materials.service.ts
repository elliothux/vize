import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QueryParams } from '../../types';
import { MaterialsEntity } from './materials.entity';
import {
  getLibCurrentVersion,
  getLibManifest,
  getLibVersions,
  listLibs,
} from './materials.utils';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(MaterialsEntity)
    private readonly materialsEntity: Repository<MaterialsEntity>,
  ) {}

  public async getLibEntity(id: number) {
    return this.materialsEntity.findOne(id);
  }

  public async getLibEntityByName(libName: string) {
    return this.materialsEntity.findOne({ libName });
  }

  public async queryLibEntities({ startPage = 0, pageSize = 10 }: QueryParams) {
    return this.materialsEntity.find({
      take: pageSize,
      skip: pageSize * startPage,
    });
  }

  public async syncAllLibs() {
    const libs = await listLibs();
    return Promise.all(libs.map(i => this.syncLib(i)));
  }

  public async syncLib(libName: string) {
    if (!(await this.checkMaterialsExists(libName))) {
      return this.createLib(libName);
    }

    console.log('sync materials lib: ', libName);
    const manifest = await getLibManifest(libName);
    const {
      lib: { displayName, author, desc, thumb, runtime },
    } = manifest;
    return this.materialsEntity.update(
      { libName },
      {
        modifiedTime: new Date(),
        author,
        libName,
        displayName,
        desc,
        thumb,
        runtime,
        version: await getLibCurrentVersion(libName),
        manifest: JSON.stringify(manifest),
      },
    );
  }

  public async createLib(libName: string) {
    const manifest = await getLibManifest(libName);
    const {
      lib: { displayName, author, desc, thumb, runtime },
    } = manifest;
    return this.materialsEntity.insert({
      createdTime: new Date(),
      author,
      libName,
      displayName,
      desc,
      thumb,
      runtime,
      version: await getLibCurrentVersion(libName),
      manifest: JSON.stringify(manifest),
    });
  }

  public async checkMaterialsExists(libName: string) {
    const count = await this.materialsEntity.count({ libName });
    return count > 0;
  }

  public async listVersions(libName: string) {
    return {
      current: await getLibCurrentVersion(libName),
      versions: await getLibVersions(libName),
    };
  }
}
