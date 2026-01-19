import { InformationBlock } from '@/components/ui/base/information-block';

function InformationBlockArea() {
  return (
    <div className='grid w-full grid-cols-3 grid-rows-3 gap-y-20'>
      {/* Top Left */}
      <div>
        <InformationBlock
          title='Sample Title'
          content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        />
      </div>

      {/* Middle Right */}
      <div className='col-start-3 row-start-2'>
        <InformationBlock
          title='Sample Title'
          content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        />
      </div>

      {/* Bottom Left */}
      <div className='col-start-1 row-start-3'>
        <InformationBlock
          title='Sample Title'
          content='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        />
      </div>
    </div>
  );
}

export { InformationBlockArea };
