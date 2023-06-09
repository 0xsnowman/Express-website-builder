import AssetManager from 'asset_manager';
import Editor from 'editor';

describe('Asset Manager', () => {
  describe('Main', () => {
    let obj;
    let imgObj;

    beforeEach(() => {
      document.body.innerHTML = '<div id="asset-c"></div>';
      imgObj = {
        type: 'image',
        src: 'path/to/image',
        width: 101,
        height: 102,
      };
      obj = new AssetManager(new Editor());
      document.body.querySelector('#asset-c').appendChild(obj.render());
    });

    afterEach(() => {
      obj = null;
    });

    test('Object exists', () => {
      expect(obj).toBeTruthy();
    });

    test('No assets inside', () => {
      expect(obj.getAll().length).toEqual(0);
    });

    test('Add new asset', () => {
      obj.add(imgObj);
      expect(obj.getAll().length).toEqual(1);
    });

    test('Added asset has correct data', () => {
      obj.add(imgObj);
      var asset = obj.get(imgObj.src);
      expect(asset.get('width')).toEqual(imgObj.width);
      expect(asset.get('height')).toEqual(imgObj.height);
      expect(asset.get('type')).toEqual(imgObj.type);
    });

    test('Add asset with src', () => {
      obj.add(imgObj.src);
      var asset = obj.get(imgObj.src);
      expect(asset.get('type')).toEqual('image');
      expect(asset.get('src')).toEqual(imgObj.src);
    });

    test('Add asset with more src', () => {
      obj.add([imgObj.src, imgObj.src + '2']);
      expect(obj.getAll().length).toEqual(2);
      var asset1 = obj.getAll().at(0);
      var asset2 = obj.getAll().at(1);
      expect(asset1.get('src')).toEqual(imgObj.src);
      expect(asset2.get('src')).toEqual(imgObj.src + '2');
    });

    test('Remove asset', () => {
      obj.add(imgObj);
      obj.remove(imgObj.src);
      expect(obj.getAll().length).toEqual(0);
    });

    test('Render assets', () => {
      obj.add(imgObj);
      expect(obj.render()).toBeTruthy();
    });
  });
});
